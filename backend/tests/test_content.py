API = "/api/v1"


def test_about(client, auth):
    assert client.get(f"{API}/about").status_code == 404
    # first save must include full_name
    assert client.put(f"{API}/about", json={"headline": "x"}, headers=auth).status_code == 422
    assert client.put(f"{API}/about", json={"full_name": "Prasann", "email": "p@x.com"}, headers=auth).status_code == 200
    r = client.put(f"{API}/about", json={"headline": "Dev"}, headers=auth)
    assert r.json()["full_name"] == "Prasann" and r.json()["headline"] == "Dev"
    assert client.get(f"{API}/about").json()["headline"] == "Dev"
    assert client.put(f"{API}/about", json={"headline": "y"}).status_code == 401


def test_skills(client, auth):
    client.post(f"{API}/skills", json={"name": "React", "category": "Frontend"}, headers=auth)
    client.post(f"{API}/skills", json={"name": "Hidden", "category": "Secret", "is_visible": False}, headers=auth)
    assert client.get(f"{API}/skills").json()["total"] == 1
    assert client.get(f"{API}/skills?all=true", headers=auth).json()["total"] == 2
    assert client.get(f"{API}/skills/categories").json() == ["Frontend"]
    assert client.get(f"{API}/skills?category=Frontend").json()["total"] == 1
    assert client.post(f"{API}/skills", json={"name": "X", "level": 150}, headers=auth).status_code == 422


def test_experience_date_rules(client, auth):
    body = {"company": "A", "position": "Dev", "start_date": "2025-09-01", "end_date": "2026-03-31"}
    created = client.post(f"{API}/experience", json=body, headers=auth)
    assert created.status_code == 201
    eid = created.json()["id"]

    assert client.put(f"{API}/experience/{eid}", json={"end_date": "2025-01-01"}, headers=auth).status_code == 422
    current = client.put(f"{API}/experience/{eid}", json={"is_current": True}, headers=auth)
    assert current.json()["end_date"] is None
    assert client.post(f"{API}/experience", json={**body, "end_date": "2020-01-01"}, headers=auth).status_code == 422
    assert client.get(f"{API}/experience").json()["total"] == 1  # public


def test_testimonials_and_services_visibility(client, auth):
    client.post(f"{API}/testimonials", json={"name": "A", "content": "great"}, headers=auth)
    client.post(f"{API}/testimonials", json={"name": "B", "content": "ok", "is_published": False}, headers=auth)
    assert client.get(f"{API}/testimonials").json()["total"] == 1
    assert client.post(f"{API}/testimonials", json={"name": "C", "content": "x", "rating": 9}, headers=auth).status_code == 422

    client.post(f"{API}/services", json={"title": "Web"}, headers=auth)
    client.post(f"{API}/services", json={"title": "Old", "is_active": False}, headers=auth)
    assert client.get(f"{API}/services").json()["total"] == 1
    assert client.get(f"{API}/services?all=true", headers=auth).json()["total"] == 2


def test_stats(client, auth):
    assert client.get(f"{API}/stats").status_code == 401
    client.post(f"{API}/projects", json={"title": "A"}, headers=auth)
    stats = client.get(f"{API}/stats", headers=auth).json()
    assert stats["projects"] == 1 and stats["unread_messages"] == 0 and stats["recent_messages"] == []