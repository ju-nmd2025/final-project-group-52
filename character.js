export default class Character {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        rect(this.x, this.y, this.w, this.h);
    }

    isColliding(character, platform) {
        // If character was passed in, use it. Otherwise use this instance.
        const c = character || this;

        const cLeft   = c.x;
        const cRight  = c.x + c.w;
        const cTop    = c.y;
        const cBottom = c.y + c.h;

        const pLeft   = platform.x;
        const pRight  = platform.x + platform.w;
        const pTop    = platform.y;
        const pBottom = platform.y + platform.h;

        // AABB collision detection 
        const horizontalOverlap = cRight > pLeft && cLeft < pRight;
        const verticalOverlap   = cBottom > pTop && cTop < pBottom;

        return horizontalOverlap && verticalOverlap;
    }
}
