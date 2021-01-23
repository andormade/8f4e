import {
	createShader,
	createProgram,
	createTexture,
	fillBufferWithRectangleVertices,
	fillBufferWithSpriteCoordinates,
	fillBufferWithLineVertices,
} from './utils';
// @ts-ignore
import vertexShader from './shaders/shader.vert';
// @ts-ignore
import textureShader from './shaders/texture.frag';

export class Engine {
	program: WebGLProgram;
	gl: WebGL2RenderingContext | WebGLRenderingContext;
	glPositionBuffer: WebGLBuffer;
	glTextureCoordinateBuffer: WebGLBuffer;
	vertexBuffer: Float32Array;
	vertexBufferCounter: number;
	textureCoordinateBuffer: Float32Array;
	textureCoordinateBufferCounter: number;
	spriteSheet: WebGLTexture;
	spriteSheetWidth: number;
	spriteSheetHeight: number;
	frameCounter: number;
	startTime: number;
	lastRenderFinishTime: number;
	lastRenderStartTime: number;
	offsetX: number;
	offsetY: number;
	offsetGroups: number[][];

	/**
	 * If enabled, it makes the render function block the main thread until the GPU finishes rendering.
	 * Otherwise rendering is asynchronous, and there's no other way to get notified of the end of it.
	 * It makes possible to measure the time a whole render cycle took.
	 */
	isPerformanceMeasurementMode: boolean;

	spriteLookup: (
		sprite: string
	) => { letterSpacing: number; spriteHeight: number; spriteWidth: number; x: number; y: number };

	constructor(canvas: HTMLCanvasElement) {
		this.gl = canvas.getContext('webgl', { antialias: false });

		this.program = createProgram(this.gl, [
			createShader(this.gl, textureShader, this.gl.FRAGMENT_SHADER),
			createShader(this.gl, vertexShader, this.gl.VERTEX_SHADER),
		]);

		const a_position = this.gl.getAttribLocation(this.program, 'a_position');
		const a_texcoord = this.gl.getAttribLocation(this.program, 'a_texcoord');
		this.glTextureCoordinateBuffer = this.gl.createBuffer();
		this.glPositionBuffer = this.gl.createBuffer();

		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clearColor(0, 0, 0, 1.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		this.gl.useProgram(this.program);
		this.setUniform('u_resolution', canvas.width, canvas.height);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.glPositionBuffer);
		this.gl.vertexAttribPointer(a_position, 2, this.gl.FLOAT, false, 0, 0);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.glTextureCoordinateBuffer);
		this.gl.vertexAttribPointer(a_texcoord, 2, this.gl.FLOAT, false, 0, 0);

		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.gl.enable(this.gl.BLEND);

		this.gl.enableVertexAttribArray(a_texcoord);
		this.gl.enableVertexAttribArray(a_position);

		this.vertexBuffer = new Float32Array(100000);
		this.textureCoordinateBuffer = new Float32Array(100000);
		this.startTime = Date.now();
		this.frameCounter = 0;
		this.isPerformanceMeasurementMode = false;
		this.offsetX = 0;
		this.offsetY = 0;
		this.offsetGroups = [];
	}

	startGroup(x: number, y: number) {
		this.offsetX += x;
		this.offsetY += y;
		this.offsetGroups.push([x, y]);
	}

	endGroup() {
		const [x, y] = this.offsetGroups.pop();
		this.offsetX -= x;
		this.offsetY -= y;
	}

	resize(width: number, height: number) {
		if (width === this.gl.canvas.width && height === this.gl.canvas.height) {
			return;
		}

		this.gl.canvas.width = width;
		this.gl.canvas.height = height;
		this.gl.viewport(0, 0, width, height);
		this.setUniform('u_resolution', width, height);
	}

	render(callback: (timeToRender: number, fps: number, triangles: number, maxTriangles: number) => void) {
		const triangles = this.vertexBufferCounter / 6;
		const maxTriangles = Math.floor(this.vertexBuffer.length / 6);
		this.vertexBufferCounter = 0;
		this.textureCoordinateBufferCounter = 0;

		const fps = Math.floor(this.frameCounter / ((Date.now() - this.startTime) / 1000));
		const timeToRender = Math.round((this.lastRenderStartTime - this.lastRenderFinishTime) * 100) / 100;

		this.lastRenderStartTime = performance.now();

		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		callback(timeToRender, fps, triangles, maxTriangles);

		this.rendervertexBuffer();

		this.lastRenderFinishTime = performance.now();
		this.frameCounter++;

		window.requestAnimationFrame(() => {
			this.render(callback);
		});
	}

	/**
	 * Fills the line drawing buffer with indices of a rectangle.
	 * @param x top left corner X coordinate
	 * @param y top left corner Y coordinate
	 * @param width width of the rectanlge
	 * @param height height of the reactanlge
	 */
	drawRectangle(x: number, y: number, width: number, height: number, sprite: any, thickness: number) {
		this.drawLine(x, y, x + width, y, sprite, thickness);
		this.drawLine(x + width, y, x + width, y + height, sprite, thickness);
		this.drawLine(x + width, y + height, x, y + height, sprite, thickness);
		this.drawLine(x, y + height, x, y, sprite, thickness);
	}

	loadSpriteSheet(image: HTMLImageElement | HTMLCanvasElement | OffscreenCanvas) {
		this.spriteSheet = createTexture(this.gl, image);
		this.spriteSheetWidth = image.width;
		this.spriteSheetHeight = image.height;
	}

	drawSpriteFromCoordinates(
		x: number,
		y: number,
		width: number,
		height: number,
		spriteX: number,
		spriteY: number,
		spriteWidth: number = width,
		spriteHeight: number = height
	): void {
		x = x + this.offsetX;
		y = y + this.offsetY;
		fillBufferWithRectangleVertices(this.vertexBuffer, this.vertexBufferCounter, x, y, width, height);
		fillBufferWithSpriteCoordinates(
			this.textureCoordinateBuffer,
			this.textureCoordinateBufferCounter,
			spriteX,
			spriteY,
			spriteWidth,
			spriteHeight,
			this.spriteSheetWidth,
			this.spriteSheetHeight
		);
		this.vertexBufferCounter += 12;
		this.textureCoordinateBufferCounter += 12;
	}

	drawLine(x1: number, y1: number, x2: number, y2: number, sprite: any, thickness: number) {
		x1 = x1 + this.offsetX;
		y1 = y1 + this.offsetY;
		x2 = x2 + this.offsetX;
		y2 = y2 + this.offsetY;
		const { x, y, spriteWidth, spriteHeight } = this.spriteLookup(sprite);

		fillBufferWithLineVertices(this.vertexBuffer, this.vertexBufferCounter, x1, y1, x2, y2, thickness);

		fillBufferWithSpriteCoordinates(
			this.textureCoordinateBuffer,
			this.textureCoordinateBufferCounter,
			x,
			y,
			spriteWidth,
			spriteHeight,
			this.spriteSheetWidth,
			this.spriteSheetHeight
		);

		this.vertexBufferCounter += 12;
		this.textureCoordinateBufferCounter += 12;
	}

	drawSprite(posX: number, posY: number, sprite: string, width?: number, height?: number): void {
		const { x, y, spriteWidth, spriteHeight } = this.spriteLookup(sprite);
		this.drawSpriteFromCoordinates(
			posX,
			posY,
			width || spriteWidth,
			height || spriteHeight,
			x,
			y,
			spriteWidth,
			spriteHeight
		);
	}

	rendervertexBuffer() {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.glTextureCoordinateBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.textureCoordinateBuffer, this.gl.STATIC_DRAW);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.glPositionBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexBuffer, this.gl.STATIC_DRAW);

		this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexBufferCounter / 2);

		if (this.isPerformanceMeasurementMode) {
			this.gl.finish();
		}
	}

	setSpriteLookupAlgorithm(spriteLookup) {
		this.spriteLookup = spriteLookup;
	}

	drawText(posX: number, posY: number, text: string, font: string = '', letterSpacing: number = 2) {
		for (let i = 0; i < text.length; i++) {
			const { x, y, spriteWidth, spriteHeight } = this.spriteLookup(font + text[i]);
			this.drawSpriteFromCoordinates(posX + i * (spriteWidth + letterSpacing), posY, spriteWidth, spriteHeight, x, y);
		}
	}

	setUniform(name, ...values: any) {
		const location = this.gl.getUniformLocation(this.program, name);
		this.gl['uniform' + values.length + 'f'](location, ...values);
	}
}
