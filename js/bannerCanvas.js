// 跟随
var width = '';
var height = '';
var canvas = '';
var points = [];
var target = '';
var animateHeader = true;
function Circle(pos, rad, color) {
    var _this = this;
    // constructor
    (function() {
        _this.pos = pos || null;
        _this.radius = rad || null;
        _this.color = color || null;
    })();

    this.draw = function() {
        if (!_this.active) return;
        ctx.beginPath();
        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(156,217,249,' + _this.active + ')';
        ctx.fill();
    };
};
function shiftPoint(p) {
    TweenLite.to(p, 1 + 1 * Math.random(), {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Circ.easeInOut,
        onComplete: function() {
            shiftPoint(p);
        }
    });
};
//鼠标跟随
function initHeader() {
    this.width = $('#banner-canvas').width();
    this.height = $('#banner-canvas').height();
    this.target = {
        x: this.width / 2,
        y: this.height / 2
    };
    this.canvas = document.getElementById('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    ctx = this.canvas.getContext('2d');

    // create points
    for (var x = 0; x < this.width; x = x + this.width / 20) {
        for (var y = 0; y < this.height; y = y + this.height / 20) {
            var px = x + Math.random() * this.width / 20;
            var py = y + Math.random() * this.height / 20;
            var p = {
                x: px,
                originX: px,
                y: py,
                originY: py
            };
            this.points.push(p);
        }
    }

    // for each point find the 5 closest points
    for (var i = 0; i < this.points.length; i++) {
        var closest = [];
        var p1 = this.points[i];
        for (var j = 0; j < this.points.length; j++) {
            var p2 = this.points[j]
            if (!(p1 == p2)) {
                var placed = false;
                for (var k = 0; k < 5; k++) {
                    if (!placed) {
                        if (closest[k] == undefined) {
                            closest[k] = p2;
                            placed = true;
                        }
                    }
                }

                for (var k = 0; k < 5; k++) {
                    if (!placed) {
                        if (this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
                            closest[k] = p2;
                            placed = true;
                        }
                    }
                }
            }
        }
        p1.closest = closest;
    }

    // assign a circle to each point
    for (var i in this.points) {
        var c = new Circle(this.points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
        this.points[i].circle = c;
    }

};
// Event handling
function addListeners() {
    if (!('ontouchstart' in window)) {
        window.addEventListener('mousemove', this.mouseMove);
    }
    window.addEventListener('scroll', this.scrollCheck);
    window.addEventListener('resize', this.resize);
};
function mouseMove(e) {
    var posx = 0;
    var posy = 0;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    this.target.x = posx;
    this.target.y = posy;
}
function scrollCheck() {
    if (document.body.scrollTop > this.height) {
        this.animateHeader = false;
    } else {
        this.animateHeader = true;
    }
}
function resize() {
    this.width = $('#banner-canvas').width();
    this.height = $('#banner-canvas').height();
    this.canvas.width = this.width;
    this.canvas.height = this.height;
};
// animation
function initAnimation() {
    this.animate();
    for (var i in this.points) {
        shiftPoint(this.points[i]);
    }
};
function animate() {
    if (this.animateHeader) {
        ctx.clearRect(0, 0, this.width, this.height);
        for (var i in this.points) {
            // detect points in range
            if (Math.abs(this.getDistance(this.target, this.points[i])) < 4000) {
                this.points[i].active = 0.3;
                this.points[i].circle.active = 0.6;
            } else if (Math.abs(this.getDistance(this.target, this.points[i])) < 20000) {
                this.points[i].active = 0.1;
                this.points[i].circle.active = 0.3;
            } else if (Math.abs(this.getDistance(this.target, this.points[i])) < 40000) {
                this.points[i].active = 0.02;
                this.points[i].circle.active = 0.1;
            } else {
                this.points[i].active = 0;
                this.points[i].circle.active = 0;
            }
            this.drawLines(this.points[i]);
            this.points[i].circle.draw();
        }
    }
    requestAnimationFrame(this.animate);
};
// Canvas manipulation
function drawLines(p) {
    if (!p.active) return;
    for (var i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
        ctx.stroke();
    }
};
// Util
function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
};
// 旋转星空
function starts() {
    var stars = 80;
    var $stars = $('.stars');
    var r = 400;
    for (var i = 0; i < stars; i++) {
        if (window.CP.shouldStopExecution(1)) {
            break;
        }
        var $star = $('<div/>').addClass('star');
        $stars.append($star);
    }
    window.CP.exitedLoop(1);
    $('.star').each(function() {
        var cur = $(this);
        var s = 0.2 + Math.random() * 1;
        var curR = r + Math.random() * 300;
        cur.css({
            transformOrigin: '0 0 ' + curR + 'px',
            transform: ' translate3d(0,0,-' + curR + 'px) rotateY(' + Math.random() * 360 + 'deg) rotateX(' + Math.random() * -50 + 'deg) scale(' + s + ',' + s + ')'
        });
    });
};

starts();
initHeader();
initAnimation();
addListeners();