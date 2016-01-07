/**
 * Created by Laurin on 30.11.2015.
 */

Phaser.Filter.DrunkFilter = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.blur = { type: '1f', value: 1 / 512 };

    this.fragmentSrc = [

        "precision mediump float;",
        "varying vec2 vTextureCoord;",
        "varying vec4 vColor;",
        "uniform float blur;",
        "uniform sampler2D uSampler;",

        "void main(void) {",

        "vec4 sum = vec4(0.0);",

        "sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;",

        "gl_FragColor = sum;",

        "}"
    ];

};

Phaser.Filter.DrunkFilter.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.DrunkFilter.prototype.constructor = Phaser.Filter.DrunkFilter;

Object.defineProperty(Phaser.Filter.DrunkFilter.prototype, 'drunk', {

    get: function() {
        return this.uniforms.blur.value / (1/7000);
    },

    set: function(value) {
        this.dirty = true;
        this.uniforms.blur.value = (1/7000) * value;
    }

});
