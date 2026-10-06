API = "/api/v1"


def test_publish_flow(client, auth):
    r = client.post(f"{API}/blogs", json={"title": "Hello World", "content": "<p>hi</p>"}, headers=auth)
    blog = r.json()
    assert r.status_code == 201 and blog["published_at"] is None

    # draft: invisible to the public
    assert client.get(f"{API}/blogs").json()["total"] == 0
    assert client.get(f"{API}/blogs/hello-world").status_code == 404

    # publish
    r = client.put(f"{API}/blogs/{blog['id']}", json={"is_published": True}, headers=auth)
    assert r.json()["published_at"] is not None
    listing = client.get(f"{API}/blogs").json()
    assert listing["total"] == 1 and "content" not in listing["items"][0]
    assert client.get(f"{API}/blogs/hello-world").json()["content"] == "<p>hi</p>"

    # unpublish clears the date
    r = client.put(f"{API}/blogs/{blog['id']}", json={"is_published": False}, headers=auth)
    assert r.json()["published_at"] is None


def test_published_at_survives_edits(client, auth):
    blog = client.post(
        f"{API}/blogs", json={"title": "T", "content": "c", "is_published": True}, headers=auth
    ).json()
    first = blog["published_at"]
    edited = client.put(f"{API}/blogs/{blog['id']}", json={"content": "new"}, headers=auth).json()
    assert edited["published_at"] == first and edited["content"] == "new"


def test_admin_can_read_draft_by_id(client, auth):
    blog = client.post(f"{API}/blogs", json={"title": "Draft", "content": "c"}, headers=auth).json()
    assert client.get(f"{API}/blogs/id/{blog['id']}").status_code == 401
    assert client.get(f"{API}/blogs/id/{blog['id']}", headers=auth).json()["content"] == "c"


def test_validation(client, auth):
    assert client.post(f"{API}/blogs", json={"title": "No content"}, headers=auth).status_code == 422