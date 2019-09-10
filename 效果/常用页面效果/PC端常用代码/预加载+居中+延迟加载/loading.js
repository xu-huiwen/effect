function loading(id) {
    this.sum = this.n = this.len = 0;
    this._img = [];
    this.loadingBox = _$.gId(id + "-loading");
    this.loading = _$.gTag(this.loadingBox, "strong")[0];
    this.imgs = _$.gTag(_$.gId(id), "img");
    this.loading.innerHTML = "0%";
    var that = this;
    _$.show(this.loadingBox);
    if (this.imgs.length != 0) {
        this.sum = this.n = this.len = this.imgs.length;
        for (var j = 0; j < this.len; j++) {
            this._img[j] = new Image();
            this._img[j].index = j;
            this._img[j].onload = this._img[j].onerror = function() {
                that.n--, that.imgs[this.index].src = that.imgs[this.index].getAttribute("data-src"), that.imgs[this.index].setAttribute("data-src", ""), that.loading.innerHTML = parseInt(((that.sum - that.n) * 100 / that.sum)) + "%", that.n == 0 && _$.hide(that.loadingBox)
            };
            this._img[j].src = this.imgs[j].getAttribute("data-src");
        }
    } else {
        _$.hide(this.loadingBox)
    }
}