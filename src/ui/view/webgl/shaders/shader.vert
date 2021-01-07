attribute vec2 a_position;
attribute vec2 a_texcoord;

uniform vec2 u_resolution;

varying vec2 v_texcoord;
varying float v_draw_texture;

void main() {
	vec2 zeroToOne = a_position / u_resolution;
	vec2 zeroToTwo = zeroToOne * 2.0;
	vec2 clipSpace = zeroToTwo - 1.0;

    gl_PointSize = 1.0;
	gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

	// if (a_texcoord) {
	// 	v_draw_texture = 1.0;
	// }
	// else {
	// 	v_draw_texture = 0.0;
	// }

	v_texcoord = a_texcoord;
}