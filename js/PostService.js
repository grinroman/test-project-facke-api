class PostService {
    _apiBase = 'https://jsonplaceholder.typicode.com/posts';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}!
                             status: ${res.status}`);
        }

        return await res.json();
    };

    deleteResource = async (url, postList) => {
        fetch(url, { method: 'DELETE' })
            .then((res) => {
                return res.status !== 200;
            })
            .catch((err) => {
                throw new Error(`Could not fetch ${this._apiBase}!`);
            });
    };

    getOptionalPost = async (id) => {
        const res = await this.getResource(`${this._apiBase}?id=${id}`);
        return res;
    };

    getAllPosts = async () => {
        const res = await this.getResource(`${this._apiBase}`);
        return res;
    };

    addResource = async (userInfo) => {
        await fetch(this._apiBase, {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
            .then((res) => {
                return res.status !== 201;
            })
            .catch((err) => {
                throw new Error(`Could not fetch ${this._apiBase}!`);
            });
    };

    deleteOnePost = async (id = 1) => {
        this.deleteResource(`${this._apiBase}/${id}`);
    };
}

export default PostService;
