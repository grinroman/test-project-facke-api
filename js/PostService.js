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

    deleteResource = async (url) => {
        fetch(url, { method: 'DELETE' });
        // if (!res.ok) {
        //     throw new Error(`Could not fetch ${url}!
        //                      status: ${res.status}`);
        // }
    };

    getOptionalPosts = async (page = 1) => {
        const res = await this.getResource(`${this._apiBase}?userId=${page}`);
        return res;
    };

    getAllPosts = async () => {
        const res = await this.getResource(`${this._apiBase}`);
        return res;
    };

    deleteOnePost = async (id = 1) => {
        this.deleteResource(`${this._apiBase}/${id}`);
    };
}

export default PostService;
