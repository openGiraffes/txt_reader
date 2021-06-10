$.extend({
    getFileType: function (file, callBack) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var encoding = '';
            var array = e.target.result;
            var bytes = new Uint8Array(array, 0, 4);
            var b1 = bytes[0], b2 = bytes[1], b3 = bytes[2], b4 = bytes[3];
            if (b1 == 239 && b2 == 187) {
                encoding = 'utf8';
            }
            //https://en.wikipedia.org/wiki/GBK_(character_encoding)
            else if ((b1 >= 129 && b1 <= 254 && b2 >= 64 && b2 <= 254) ||
                (b2 >= 64 && b2 <= 254 && b1 >= 129 && b1 <= 160) ||
                (b2 >= 64 && b2 < 160 && b2 != 127 && ((b1 >= 170 && b1 <= 254) || (b1 >= 161 && b1 <= 249)))
                || (b2 >= 161 && b2 <= 254 && ((b1 >= 161 && b1 <= 169) || (b1 >= 176 && b1 <= 247)
                    || (b1 >= 170 && b1 <= 175) || (b1 >= 248 && b1 <= 254)))) {
                encoding = "gbk";
            }
            else if (b1 == 254 && b2 == 255) {
                encoding = 'utf-16be';
            }
            else if (b1 == 255 && b2 == 254) {
                encoding = 'utf-16le';
            }
            //https://en.wikipedia.org/wiki/GB_18030
            else if ((b1 >= 0 && b1 <= 127) || b1 == 128 || b1 == 255 ||
                (b1 >= 0 && b1 <= 127 && b2 >= 64 && b2 <= 254 && b2 != 127) ||
                (b1 >= 129 && b1 <= 143 && b2 >= 48 && b2 <= 57 && b3 >= 129 && b3 <= 254 && b4 >= 48 && b4 <= 57) ||
                (b1 >= 144 && b1 <= 254 && b2 >= 48 && b2 <= 57 && b3 >= 129 && b3 <= 254 && b4 >= 48 && b4 <= 57)) {
                encoding = 'gb18030';
            }
            callBack(encoding);
        };
        reader.readAsArrayBuffer(file);
    },
    readyFile: function (file, encoding, callBack) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var result = e.target.result;
            callBack(result);
        };
        reader.readAsText(file, encoding);
    },
    getPath: function (callBack) {
        var root = navigator.getDeviceStorage('sdcard');
        var cursor = root.enumerate();
        cursor.onsuccess = function () {
            if (this.result) {
                if (this.result.name.endsWith('.txt'))
                    callBack(this.result);
                this.continue();
            }
        }
    }
});