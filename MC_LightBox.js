const MCLightBox = function (target, options = {}) {
    this.options = options;
    this.target = target;
    this.init();
}

MCLightBox.prototype.init = function () {
    this.createLightBox();
}

MCLightBox.prototype.createLightBox = function () {
    const $this = this;
    const lightBox = document.createElement('div');
    const target = this.target;
    const items = document.querySelectorAll(target);
    $this.options.totalItems = items.length;
    lightBox.classList.add('mc__lightBox');
    lightBox.innerHTML = `
        <div class="mc__lightBoxContent__overlay"></div>
        <div class="mc__lightBoxContentInner"></div>
        <div class="mc__arrow mc__arrow-left"></div>
        <div class="mc__arrow mc__arrow-right"></div>
    `;
    document.body.appendChild(lightBox);
    items.forEach(function (item, i) {
        item.addEventListener('click', function () {
            if (document.querySelector('.mc__lightBox')) {
                document.querySelector('.mc__lightBox').classList.add('active');
                document.querySelector('.mc__lightBox .mc__lightBoxContentInner').innerHTML = "";
                document.querySelector('.mc__lightBox .mc__lightBoxContentInner').appendChild(item.cloneNode(true));
                $this.options.currentITem = i;
            }
        });
    });

    document.querySelector('.mc__lightBox .mc__lightBoxContent__overlay').addEventListener('click', function () {
        $this.closeLightBox();
    });

    document.querySelector('.mc__lightBox .mc__arrow-left').addEventListener('click', function () {
        $this.prevItem();
    });

    document.querySelector('.mc__lightBox .mc__arrow-right').addEventListener('click', function () {
        $this.nextItem();
    });
}

MCLightBox.prototype.closeLightBox = function () {
    document.querySelector('.mc__lightBox').classList.remove('active');
}

MCLightBox.prototype.destroy = function () {
    document.querySelector('.mc__lightBox').remove();
}

MCLightBox.prototype.nextItem = function () {
    const $this = this;
    const items = document.querySelectorAll(this.target);
    if ($this.options.currentITem < $this.options.totalItems - 1) {
        document.querySelector('.mc__lightBox .mc__lightBoxContentInner').innerHTML = "";
        document.querySelector('.mc__lightBox .mc__lightBoxContentInner').appendChild(items[$this.options.currentITem + 1].cloneNode(true));
        $this.options.currentITem++;
    }
    if ($this.options.currentITem == $this.options.totalItems - 1) {
        document.querySelector('.mc__lightBox .mc__lightBoxContentInner').innerHTML = "";
        document.querySelector('.mc__lightBox .mc__lightBoxContentInner').appendChild(items[0].cloneNode(true));
        $this.options.currentITem = 0;
    }
}

MCLightBox.prototype.prevItem = function () {
    const $this = this;
    const items = document.querySelectorAll($this.target);
    if ($this.options.currentITem > 0) {
        document.querySelector('.mc__lightBox .mc__lightBoxContentInner').innerHTML = "";
        document.querySelector('.mc__lightBox .mc__lightBoxContentInner').appendChild(items[$this.options.currentITem - 1].cloneNode(true));
        $this.options.currentITem--;
    }
    if ($this.options.currentITem == 0) {
        document.querySelector('.mc__lightBox .mc__lightBoxContentInner').innerHTML = "";
        document.querySelector('.mc__lightBox .mc__lightBoxContentInner').appendChild(items[$this.options.totalItems - 1].cloneNode(true));
        $this.options.currentITem = $this.options.totalItems - 1;
    }
}
