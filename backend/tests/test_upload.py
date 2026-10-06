from app.core.config import settings

API = "/api/v1"


def test_upload_lifecycle(client, auth, png_bytes, tmp_path, monkeypatch):
    monkeypatch.setattr(settings, "UPLOAD_DIR", str(tmp_path))
    files = {"file": ("pic.png", png_bytes, "image/png")}

    assert client.post(f"{API}/upload/image", files=files).status_code == 401

    r = client.post(f"{API}/upload/image", files=files, headers=auth)
    assert r.status_code == 201
    media = r.json()
    assert media["content_type"] == "image/png" and media["url"].endswith(".png")
    assert (tmp_path / media["public_id"]).is_file()

    assert client.get(f"{API}/upload", headers=auth).json()["total"] == 1
    assert client.delete(f"{API}/upload/{media['id']}", headers=auth).status_code == 204
    assert not (tmp_path / media["public_id"]).exists()


def test_rejects_fake_images(client, auth, tmp_path, monkeypatch):
    monkeypatch.setattr(settings, "UPLOAD_DIR", str(tmp_path))
    fake = {"file": ("evil.png", b"<script>alert(1)</script>", "image/png")}
    assert client.post(f"{API}/upload/image", files=fake, headers=auth).status_code == 415


def test_rejects_oversized_files(client, auth, png_bytes, tmp_path, monkeypatch):
    monkeypatch.setattr(settings, "UPLOAD_DIR", str(tmp_path))
    monkeypatch.setattr(settings, "MAX_UPLOAD_MB", 0)
    files = {"file": ("pic.png", png_bytes, "image/png")}
    assert client.post(f"{API}/upload/image", files=files, headers=auth).status_code == 413