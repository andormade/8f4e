import { resolveConfig } from 'prettier';

export const createRectangleBuffer = (x, y, width, height) => {
	return [x, y, x + width, y, x + width, y + height, x, y + height];
};

export const createLineBuffer = (x, y, x2, y2) => {
	return [x, y, x2, y2];
};

export const drawRectangles = (gl, rectangles) => {
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rectangles.flat()), gl.STATIC_DRAW);
	for (let i = 0; i < rectangles.length * 4; i += 4) {
		gl.drawArrays(gl.LINE_LOOP, i, 4);
	}
};

export const drawLines = (gl, lines) => {
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lines.flat()), gl.STATIC_DRAW);
	for (let i = 0; i < lines.length * 2; i += 2) {
		gl.drawArrays(gl.LINES, i, 2);
	}
};

export const drawTriangles = (gl, triangles) => {
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangles), gl.STATIC_DRAW);
	gl.drawArrays(gl.TRIANGLES, 0, 6);
};

export const loadImage = async src => {
	return new Promise(resolve => {
		const image = new Image();
		image.src = src;
		image.onload = function () {
			resolve(image);
		};
	});
};

export const setUniform = function (gl, program, name, ...values) {
	const location = gl.getUniformLocation(program, name);
	gl['uniform' + values.length + 'f'](location, ...values);
};

function setRectangle(gl, x, y, width, height) {
	var x1 = x;
	var x2 = x + width;
	var y1 = y;
	var y2 = y + height;
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]), gl.STATIC_DRAW);
}

export const drawImage = (
	gl,
	program,
	positionBuffer,
	texcoordBuffer,
	a_position,
	a_texcoord,
	image,
	x,
	y,
	width,
	height
) => {
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
	gl.enableVertexAttribArray(a_texcoord);
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0]),
		gl.STATIC_DRAW
	);

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.enableVertexAttribArray(a_position);

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

	setUniform(gl, program, 'u_draw_texture', true);
	setRectangle(gl, x, y, width, height);
	gl.drawArrays(gl.TRIANGLES, 0, 6);

	gl.disableVertexAttribArray(a_texcoord);
	setUniform(gl, program, 'u_draw_texture', false);
};
