API = "/api/v1"


def test_requires_auth_to_create(client):
    assert client.post(f"{API}/projects", json={"title": "X"}).status_code == 401


def test_create_generates_unique_slugs(client, auth):
    r = client.post(f"{API}/projects", json={"title": "My App", "tech_stack": ["React"]}, headers=auth)
    assert r.status_code == 201
    assert r.json()["slug"] == "my-app" and r.json()["tech_stack"] == ["React"]
    again = client.post(f"{API}/projects", json={"title": "My App"}, headers=auth)
    assert again.json()["slug"] == "my-app-2"


def test_drafts_hidden_from_public(client, auth):
    client.post(f"{API}/projects", json={"title": "Live"}, headers=auth)
    client.post(f"{API}/projects", json={"title": "Secret", "is_published": False}, headers=auth)

    public = client.get(f"{API}/projects").json()
    assert public["total"] == 1 and public["items"][0]["title"] == "Live"
    assert client.get(f"{API}/projects/secret").status_code == 404
    assert client.get(f"{API}/projects/secret", headers=auth).status_code == 200

    assert client.get(f"{API}/projects?all=true").status_code == 401
    assert client.get(f"{API}/projects?all=true", headers=auth).json()["total"] == 2


def test_partial_update_keeps_slug_and_ignores_null_title(client, auth):
    p = client.post(f"{API}/projects", json={"title": "My App"}, headers=auth).json()
    r = client.put(f"{API}/projects/{p['id']}", json={"is_featured": True, "title": None}, headers=auth)
    assert r.status_code == 200
    assert r.json()["title"] == "My App" and r.json()["slug"] == "my-app" and r.json()["is_featured"] is True
    assert client.get(f"{API}/projects?featured=true").json()["total"] == 1


def test_get_by_id_is_admin_only(client, auth):
    p = client.post(f"{API}/projects", json={"title": "A"}, headers=auth).json()
    assert client.get(f"{API}/projects/id/{p['id']}").status_code == 401
    assert client.get(f"{API}/projects/id/{p['id']}", headers=auth).status_code == 200


def test_delete(client, auth):
    p = client.post(f"{API}/projects", json={"title": "A"}, headers=auth).json()
    assert client.delete(f"{API}/projects/{p['id']}", headers=auth).status_code == 204
    assert client.delete(f"{API}/projects/{p['id']}", headers=auth).status_code == 404


def test_pagination(client, auth):
    for i in range(5):
        client.post(f"{API}/projects", json={"title": f"P{i}"}, headers=auth)
    r = client.get(f"{API}/projects?skip=2&limit=2").json()
    assert r["total"] == 5 and len(r["items"]) == 2 and r["skip"] == 2 and r["limit"] == 2
    assert client.get(f"{API}/projects?limit=0").status_code == 422