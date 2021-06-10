$.extend({
    getFileType: function (file, callBack) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var encoding = null, bomLen = 0;
            var bytes = e.target.result;
            var b1 = bytes[0], b2 = bytes[1], b3 = bytes[2], b4 = bytes[3];
            if (b1 == 0xEF && b2 == 0xBB && b3 == 0xBF) {
                encoding = 'utf8';
            }
            //https://en.wikipedia.org/wiki/GBK_(character_encoding)
            else if ((b1 >= 0x81 && b1 <= 0xFE && b2 >= 0x40 && b2 <= 0xFE) ||
                (b2 >= 0x40 && b2 <= 0xFE && b1 >= 0x81 && b1 <= 0xA0) ||
                (b2 >= 0x40 && b2 < 0xA0 && b2 != 0x7F && ((b1 >= 0xAA && b1 <= 0xFE) || (b1 >= 0xA1 && b1 <= 0xF9)))
                || (b2 >= 0xA1 && b2 <= 0xFE && ((b1 >= 0xA1 && b1 <= 0xA9) || (b1 >= 0xB0 && b1 <= 0xF7)
                    || (b1 >= 0xAA && b1 <= 0xAF) || (b1 >= 0xF8 && b1 <= 0xFE)))) {
                encoding = "gbk";
            }
            else if (b1 == 0xFE && b2 == 0xFF) {
                encoding = 'utf-16be';
            }
            else if (b1 == 0xFF && b2 == 0xFE) {
                encoding = 'utf-16le';
            }
            //https://en.wikipedia.org/wiki/GB_18030
            else if ((b1 >= 0x00 && b1 <= 0x7F) || b1 == 0x80 || b1 == 0xFF ||
                (b1 >= 0x00 && b1 <= 0x7F && b2 >= 0x40 && b2 <= 0xFE && b2 != 0x7F) ||
                (b1 >= 0x81 && b1 <= 0x8F && b2 >= 0x30 && b2 <= 0x39 && b3 >= 0x81 && b3 <= 0xFE && b4 >= 0x30 && b4 <= 0x39) ||
                (b1 >= 0x90 && b1 <= 0xFE && b2 >= 0x30 && b2 <= 0x39 && b3 >= 0x81 && b3 <= 0xFE && b4 >= 0x30 && b4 <= 0x39)) {
                return 'gb18030';
            }
            callBack(encoding, bomLen);
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
    getPath: function (callBack, path) {
        var root = null;
        if (typeof path == 'undefined' || path == '')
            root = navigator.getDeviceStorage('sdcard');
        else
            root = navigator.getDeviceStorage(path);
        var cursor = root.enumerate();
        cursor.onsuccess = function () {
            if (this.result) {
                var file = this.result;
                console.log("File: " + file);
                this.continue();
            }
        }
    },
    getFile: function (path, callBack) {
        var root = navigator.getDeviceStorage('sdcard');
        var request = root.get(path);
        request.onsuccess = function () {
            var file = this.result;
            console.log("Get the file: " + file.name);
        }
        request.onerror = function () {
            console.warn("Unable to get the file: " + this.error);
        }

    }
});