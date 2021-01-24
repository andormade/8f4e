macro_rules! pad4 {
    [$($e:expr),*] => {
        [0b00000000, 0b00000000, 0b00000000, 0b00000000, $($e,)*]
    }
}

#[no_mangle]
pub fn getFontPointer() -> &'static[[u8; 14]; 62] {
	const a: [u8; 14] = pad4![0b01111100, 0b10000010, 0b00000010, 0b01111110, 0b10000010, 0b10000110, 0b01111010, 0, 0, 0];
	const b: [u8; 14] = [0b10000000, 0b10000000, 0b10000000, 0b10000000, 0b10111100, 0b11000010, 0b10000010, 0b10000010, 0b10000010, 0b11000010, 0b10111100, 0, 0, 0];
	const c: [u8; 14] = pad4![0b01111100, 0b10000010, 0b10000000, 0b10000000, 0b10000000, 0b10000010, 0b01111100, 0, 0, 0];
	const d: [u8; 14] = [0b00000010, 0b00000010, 0b00000010, 0b00000010, 0b01111010, 0b10000110, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b01111100, 0, 0, 0];
	const e: [u8; 14] = pad4![0b01111100, 0b10000010, 0b10000010, 0b11111100, 0b10000000, 0b10000010, 0b01111100, 0, 0, 0];
	const f: [u8; 14] = [0b00011100, 0b00100010, 0b00100000, 0b00100000, 0b11111000, 0b00100000, 0b00100000, 0b00100000, 0b00100000, 0b00100000, 0b00100000, 0, 0, 0];
	const g: [u8; 14] = pad4![0b01111010, 0b10000110, 0b10000010, 0b10000010, 0b10000010, 0x46, 0x3a, 0b00000010, 0x84, 0x78];
	const h: [u8; 14] = [0b10000000, 0b10000000, 0b10000000, 0b10000000, 0b10111100, 0b11000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0, 0, 0];
	const i: [u8; 14] = [0, 0, 0x10, 0x00, 0b01111100, 0x10, 0x10, 0x10, 0x10, 0x10, 0b01111100, 0, 0, 0];
	const j: [u8; 14] = [0, 0, 0x04, 0x00, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x84, 0x78];
	const k: [u8; 14] = [0b10000000, 0b10000000, 0b10000000, 0b10000000, 0x88, 0x90, 0xa0, 0xc0, 0xa0, 0x90, 0x8e, 0, 0, 0];
	const l: [u8; 14] = [0x70, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0xfe, 0, 0, 0];
	const m: [u8; 14] = pad4![0x6c,0x92, 0x92, 0x92, 0b10000010, 0b10000010, 0b10000010, 0, 0, 0];
	const n: [u8; 14] = pad4![0x3c, 0x40, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0, 0, 0];
	const o: [u8; 14] = pad4![0b01111100, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b01111100, 0, 0, 0];
	const p: [u8; 14] = pad4![0b10111100, 0b11000010, 0b10000010, 0b10000010, 0b10000010, 0b11000010, 0b10111100, 0b10000000, 0b10000000, 0b10000000];
	const q: [u8; 14] = pad4![0b01111010, 0b10000110, 0b10000010, 0b10000010, 0b10000010, 0b10000110, 0b01111010, 0b00000010, 0b00000010, 0b00000010];
	const r: [u8; 14] = pad4![0xbe, 0xc0, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0, 0, 0];
	const s: [u8; 14] = pad4![0x7e, 0b10000000, 0b10000000, 0b01111100, 0b00000010, 0b00000010, 0b11111100, 0, 0, 0];
	const t: [u8; 14] = [0x40, 0x40, 0x40, 0x40, 0xf0, 0x40, 0x40, 0x40, 0x40, 0b00100000, 0x1e, 0, 0, 0];
	const u: [u8; 14] = pad4![0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0x44, 0x38, 0, 0, 0];
	const v: [u8; 14] = pad4![0b10000010, 0b10000010, 0x44, 0x44, 0x28, 0x28, 0x10, 0, 0, 0];
	const w: [u8; 14] = pad4![0b10000010, 0b10000010, 0b10000010, 0x54, 0x54, 0x28, 0x28, 0, 0, 0];
	const x: [u8; 14] = pad4![0b10000010, 0x44, 0x28, 0x10, 0x28, 0x44, 0b10000010, 0, 0, 0];
	const y: [u8; 14] = pad4![0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0x46, 0x3a, 0b00000010, 0x84, 0x78];
	const z: [u8; 14] = pad4![0xfe, 0x04, 0x08, 0x10, 0b00100000, 0x40, 0xfe, 0, 0, 0];

	const A: [u8; 14] = [0x38, 0x44, 0b10000010, 0b10000010, 0b10000010, 0xfe, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0, 0, 0];
	const B: [u8; 14] = [0b11111000, 0x84, 0b10000010, 0b10000010, 0x84, 0b11111000, 0x84, 0b10000010, 0b10000010, 0x84, 0b11111000, 0, 0, 0];
	const C: [u8; 14] = [0x3c, 0x42, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0x42, 0x3c, 0, 0, 0];
	const D: [u8; 14] = [0b11111000, 0x84, 0x84, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b11111000, 0, 0, 0];
	const E: [u8; 14] = [0xfe, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0xf0, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0xfe, 0, 0, 0];
	const F: [u8; 14] = [0xfe, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0xf0, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0, 0, 0];
	const G: [u8; 14] = [0x3c, 0x42, 0b10000000, 0b10000000, 0b10000000, 0x9e, 0b10000010, 0b10000010, 0b10000010, 0x42, 0x3c, 0, 0, 0];
	const H: [u8; 14] = [0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0xfe, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0, 0, 0];
	const I: [u8; 14] = [0xfe, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0xfe, 0, 0, 0];
	const J: [u8; 14] = [0b00000010, 0b00000010, 0b00000010, 0b00000010, 0b00000010, 0b00000010, 0b00000010, 0b00000010, 0b00000010, 0x84, 0x78, 0, 0, 0];
	const K: [u8; 14] = [0, 0, 0b10000010, 0x84, 0x88, 0x90, 0xa0, 0xd0, 0x88, 0x84, 0b10000010, 0, 0, 0];
	const L: [u8; 14] = [0b10000000, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0xfe, 0, 0,  0];
	const M: [u8; 14] = [0b10000010, 0xc6, 0xaa, 0x92, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0, 0, 0];
	const N: [u8; 14] = [0b10000010, 0b11000010, 0xa2, 0x92, 0x8a, 0b10000110, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0, 0, 0];
	const O: [u8; 14] = [0x38, 0x44, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0x44, 0x38, 0, 0, 0];
	const P: [u8; 14] = [0b11111100, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b11111100, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0, 0, 0];
	const Q: [u8; 14] = [0x38, 0x44, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0x8a, 0x44, 0x3a, 0, 0, 0];
	const R: [u8; 14] = [0b11111100, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b11111100, 0x90, 0x88, 0x84, 0b10000010, 0b10000010, 0, 0, 0];
	const S: [u8; 14] = [0x38, 0x44, 0b10000000, 0b10000000, 0x40, 0x38, 0x04, 0b00000010, 0b00000010, 0x84, 0x78, 0, 0, 0];
	const T: [u8; 14] = [0xfe, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0, 0, 0];
	const U: [u8; 14] = [0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0b10000010, 0x44, 0x38, 0, 0, 0];
	const V: [u8; 14] = [0b10000010, 0b10000010, 0b10000010, 0b10000010, 0x44, 0x44, 0x44, 0x28, 0x28, 0x28, 0x10, 0, 0, 0];
	const W: [u8; 14] = [0b10000010, 0b10000010, 0b10000010, 0b10000010, 0x54, 0x54, 0x54, 0x54, 0x28, 0x28, 0x28, 0, 0, 0];
	const X: [u8; 14] = [0b10000010, 0b10000010, 0x44, 0x44, 0x28, 0x10, 0x28, 0x44, 0x44, 0b10000010, 0b10000010, 0, 0, 0];
	const Y: [u8; 14] = [0b10000010, 0b10000010, 0x44, 0x44, 0x28, 0x28, 0x10, 0x10, 0x10, 0x10, 0x10, 0, 0, 0];
	const Z: [u8; 14] = [0xfe, 0b00000010, 0b00000010, 0x04, 0x08, 0x10, 0b00100000, 0x40, 0b10000000, 0b10000000, 0xfe, 0, 0, 0];

	const _0: [u8; 14] = [0x38, 0x44, 0b10000010, 0b10000010, 0x92, 0x92, 0x92, 0b10000010, 0b10000010, 0x44, 0x38, 0, 0, 0];
	const _1: [u8; 14] = [0x10, 0x30, 0x50, 0x90, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0xfe, 0, 0, 0];
	const _2: [u8; 14] = [0x78, 0x84, 0b00000010, 0b00000010, 0x04, 0x38, 0x40, 0b10000000, 0b10000000, 0b10000000, 0xfe, 0, 0, 0];
	const _3: [u8; 14] = [0x78, 0x84, 0b00000010, 0b00000010, 0x04, 0x38, 0x04, 0b00000010, 0b00000010, 0x84, 0x78, 0, 0, 0];
	const _4: [u8; 14] = [0b10000000, 0b10000000, 0b10000000, 0x90, 0x90, 0xfe, 0x10, 0x10, 0x10, 0x10, 0x10, 0, 0, 0];
	const _5: [u8; 14] = [0xfe, 0b10000000, 0b10000000, 0b10000000, 0b10000000, 0b11111000, 0x04, 0b00000010, 0b00000010, 0x04, 0b11111000, 0, 0, 0];
	const _6: [u8; 14] = [0x3c, 0x40, 0b10000000, 0b10000000, 0b10000000, 0xb8, 0xc4, 0b10000010, 0b10000010, 0x44, 0x38, 0, 0, 0];
	const _7: [u8; 14] = [0xfe, 0b00000010, 0b00000010, 0x04, 0x04, 0x08, 0x08, 0x10, 0x10, 0b00100000, 0b00100000, 0, 0, 0];
	const _8: [u8; 14] = [0x38, 0x44, 0b10000010, 0b10000010, 0x44, 0x38, 0x44, 0b10000010, 0b10000010, 0x44, 0x38, 0, 0, 0];
	const _9: [u8; 14] = [0x38, 0x44, 0b10000010, 0b10000010, 0x46, 0x3a, 0b00000010, 0b00000010, 0b00000010, 0x04, 0b01111100, 0, 0, 0];

	const font: [[u8; 14]; 62] = [
		a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, 
		A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z,
		_0, _1, _2, _3, _4, _5, _6, _7, _8, _9
	];

	return &font;
}
