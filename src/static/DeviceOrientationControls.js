THREE.DeviceOrientationControls = function(e) {
    function t(e, t) {
        return function() {
            t.apply(e, arguments)
        };
    }
    this.object = e,
    this.object.rotation.reorder("YXZ"),
    this.freeze = !0,
    this.deviceOrientation = {},
    this.screenOrientation = 0,
    this.onDeviceOrientationChangeEvent = function(e) {
        this.deviceOrientation = e
    },

    this.onScreenOrientationChangeEvent = function() {
        this.screenOrientation = window.orientation || 0;
    }; {
         var r = 0,
         i = 0,
         n = 0;
         rb = rg = 0,
         function() {
             var e = navigator.userAgent.replace(/\s/g, "").toLowerCase();
             return e.indexOf("htc802w") > -1 ? .05 : .02
         } ()
     }
     this.avg = function(e) {
         for (var t = {
             alpha: 0,
             beta: 0,
             gamma: 0
         },
         r = 0; r < e.length; r++) t.alpha += e[r].alpha,
         t.beta += e[r].beta,
         t.gamma += e[r].gamma;
         var i = {
             alpha: t.alpha / e.length,
             beta: t.beta / e.length,
             gamma: t.gamma / e.length
         };

         return i;
     };
     var r, i, n, o, a = (beta = gamma = orient = 0, new Array),
     s = 0;
     this.x = 0;
     var l = !0;
     this.setX = function(e) {
         this.x = e
     },
     this.getX = function() {
         return this.x
     },
     this.update = function() {
         return function() {
            if (!this.freeze) {
                var e = /ip(?=od|ad|hone)/i.test(navigator.userAgent),
                t = navigator.userAgent.replace(/\s/g, "").toLowerCase();
                if (e) {
                    r = this.deviceOrientation.alpha ? THREE.Math.degToRad(this.deviceOrientation.alpha) : 0,
                    i = this.deviceOrientation.beta ? THREE.Math.degToRad(this.deviceOrientation.beta) : 0,
                    n = this.deviceOrientation.gamma ? THREE.Math.degToRad(this.deviceOrientation.gamma) : 0;

                } else {
                     if (t.indexOf("htc") > -1) {
                         if (!l) return;
                         l = !1
                     } (0 / 0 == this.x || 0 == this.x) && (this.x = this.deviceOrientation.alpha ? this.deviceOrientation.alpha - 50 : 0, this.x = 0);

var h = 20;
                     if (t.indexOf("htc") > -1) for (h = 15; a.length >= h;) a.shift();
                     t.indexOf("gt") > -1 && (h = 10),
                     a.length >= h && a.shift();
                     var c = this.deviceOrientation.alpha ? this.deviceOrientation.alpha - this.x: 0;
                     c %= 360,
                     0 > c && (c += 360),
                     a.push({
                         alpha: t.indexOf("gt") > -1 ? this.deviceOrientation.alpha: c,
                         beta: this.deviceOrientation.beta ? this.deviceOrientation.beta: 0,
                         gamma: this.deviceOrientation.gamma ? this.deviceOrientation.gamma: 0
                     });
                     var u = this.avg(a);
                     a.length > 2 ? (s = a[a.length - 2].alpha, a[a.length - 1].alpha = Math.abs(a[a.length - 1].alpha % 360 - a[a.length - 2].alpha % 360) > 180 ? a[a.length - 1].alpha < 90 ? 360 *       ((a[a.length - 2].alpha - a[a.length - 2].alpha % 360) / 360 + 1) + a[a.length - 1].alpha: a[a.length - 2].alpha - a[a.length - 2].alpha % 360 - (360 - a[a.length - 1].alpha) : a[a.length - 2].alpha -    a[a.length - 2].alpha % 360 + a[a.length - 1].alpha) : 1 == a.length && (a[0] = 3600 + a[0]),
                     u = this.avg(a),
                     r = this.deviceOrientation.alpha ? THREE.Math.degToRad(u.alpha) : 0,
                     i = this.deviceOrientation.beta ? THREE.Math.degToRad(u.beta) : 0,
                     n = this.deviceOrientation.gamma ? THREE.Math.degToRad(u.gamma) : 0;
                 }
                 o = this.screenOrientation ? THREE.Math.degToRad(this.screenOrientation) : 0;
                 for (var p = 0; p < a.length; p++);
                 setObjectQuaternion(this.object.quaternion, r, i, n, o),
                 t.indexOf("htc") > -1 && (l = !0)
             }
         }
     } (),
     this.connect = function() {
         this.onScreenOrientationChangeEvent(),
         window.addEventListener("orientationchange", t(this, this.onScreenOrientationChangeEvent), !1),
         window.addEventListener("deviceorientation", t(this, this.onDeviceOrientationChangeEvent), !1),
         this.freeze = !1
     },
     this.disconnect = function() {
         this.freeze = !0,
         window.removeEventListener("orientationchange", t(this, this.onScreenOrientationChangeEvent), !1),
         window.removeEventListener("deviceorientation", t(this, this.onDeviceOrientationChangeEvent), !1)
     },
     setObjectQuaternion = function() {
         var e = new THREE.Vector3(0, 0, 1),
         t = new THREE.Euler,
         r = new THREE.Quaternion,
         i = new THREE.Quaternion( - Math.sqrt(.5), 0, 0, Math.sqrt(.5));
         return function(n, o, a, s, l) {
             t.set(a, o, -s, "YXZ"),
             n.setFromEuler(t),
             n.multiply(i),
             n.multiply(r.setFromAxisAngle(e, -l))
         }
     } ()
 };
