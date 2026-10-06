def _login(client, password="secret123"):
    return client.post("/api/v1/auth/login", json={"email": "admin@test.com", "password": password})


def test_login_success(client):
    r = _login(client)
    assert r.status_code == 200
    assert {"access_token", "refresh_token"} <= r.json().keys()


def test_login_wrong_password(client):
    assert _login(client, "nope").status_code == 401


def test_me_requires_token(client):
    assert client.get("/api/v1/auth/me").status_code == 401


def test_me_with_token(client):
    token = _login(client).json()["access_token"]
    r = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200 and r.json()["email"] == "admin@test.com"


def test_refresh_flow(client):
    refresh = _login(client).json()["refresh_token"]
    r = client.post("/api/v1/auth/refresh", json={"refresh_token": refresh})
    assert r.status_code == 200


def test_access_token_cannot_refresh(client):
    access = _login(client).json()["access_token"]
    assert client.post("/api/v1/auth/refresh", json={"refresh_token": access}).status_code == 401