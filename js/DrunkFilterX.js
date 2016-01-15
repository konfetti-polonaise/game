/**
 * Created by Laurin on 30.11.2015.
 */

Phaser.Filter.DrunkFilterX = function (game) {

    Phaser.Filter.call(this, game);
    this.uniforms.blur = { type: '1f', value: 1 / 256 };

    this.fragmentSrc = [

        "precision mediump float;",
        "varying vec2 vTextureCoord;",
        "varying vec4 vColor;",
        "uniform float blur;",
        "uniform sampler2D uSampler;",
        "uniform float time;",

        "float xBlur = blur + 0.01 * sin(time);",


        "void main(void) {",

        "vec4 sum = vec4(0.0);",


        "sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*xBlur, vTextureCoord.y)) * 0.05;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*xBlur, vTextureCoord.y)) * 0.09;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x - 1.0*xBlur, vTextureCoord.y)) * 0.12;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x - xBlur, vTextureCoord.y)) * 0.15;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x + xBlur, vTextureCoord.y)) * 0.15;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x + 1.0*xBlur, vTextureCoord.y)) * 0.12;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*xBlur, vTextureCoord.y)) * 0.09;",
        "sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*xBlur, vTextureCoord.y)) * 0.05;",


        

        "gl_FragColor = sum;",

        "}"
    ];

};

Phaser.Filter.DrunkFilterX.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.DrunkFilterX.prototype.constructor = Phaser.Filter.DrunkFilterX;

Object.defineProperty(Phaser.Filter.DrunkFilterX.prototype, 'blur', {

    get: function() {
        return this.uniforms.blur.value / (1/7000);
    },

    set: function(value) {
        this.dirty = true;
        this.uniforms.blur.value = (1/7000) * value;
    }

});
