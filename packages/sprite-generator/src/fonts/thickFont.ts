function pad(paddingLeft: number, arr: number[], paddingRight = 0): number[] {
	return [...new Array(paddingLeft).fill(0b00000000), ...arr, ...new Array(paddingRight).fill(0b00000000)];
}

function same(byte: number, times: number): number[] {
	return new Array(times).fill(byte);
}

function mirr(toBeMirrored: number[], middle: number[] = []): number[] {
	return [...toBeMirrored, ...middle, ...toBeMirrored.slice().reverse()];
}

export default [
	pad(16, []), // Space
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(16, []), //
	pad(3, [0b00010000, 0b00111000, 0b01101100, ...same(0b11000110, 3), 0b11111110, ...same(0b11000110, 3)], 3), // !
	pad(6, [...same(0b00001010, 3), ...same(0b00000000, 5)], 2), // "
	pad(3, [...same(0b01010000, 2), 0b11111000, ...same(0b01010000, 2), 0b11111000, ...same(0b01010000, 2)], 5), // #
	pad(6, [0b00000100, ...mirr([0b00001110, 0b00010101], [0b00010100, 0b00001110, 0b0000101]), 0b00000100], 1), // $
	pad(
		6,
		[0b00001000, 0b00010100, 0b00001001, 0b00000010, 0b00000100, 0b00001000, 0b00010010, 0b00000101, 0b00000010],
		1
	), // %
	pad(6, [0b00001100, 0b00010010, 0b00010000, 0b00001000, 0b00010101, 0b00010010, 0b00010010, 0b00001101], 2), // &
	pad(6, [0b00000100, 0b00000100], 8), // '
	pad(6, mirr([0b00000010, 0b00000100, 0b00000100, 0b00001000]), 2), // (
	pad(6, mirr([0b00001000, 0b00000100, 0b00000100, 0b00000010]), 2), // )
	pad(6, mirr([0b000000100, 0b00010101, 0b00001110]), 4), // *
	pad(8, [0b00000100, 0b00000100, 0b00011111, 0b00000100, 0b00000100], 3), // +
	pad(12, [0b00001100, 0b00001100, 0b00000100, 0b00001000], 0), // ,
	pad(10, [0b00011111], 5), // -
	pad(12, [0b00001100, 0b00001100], 2), // .
	pad(6, [0b00000001, 0b00000001, 0b00000010, 0b00000010, 0b00000100, 0b00000100, 0b00001000, 0b00001000], 2), // /

	/* 0-9 */
	pad(3, mirr([0b00111000, 0b01101100, ...same(0b11000110, 2)], [...same(0b11010110, 2)]), 3), // 0
	pad(3, [0b00011000, 0b00111000, 0b01111000, ...same(0b00011000, 6), 0b01111110], 3), // 1
	pad(
		3,
		[
			0b01111100, 0b11000110, 0b00000110, 0b00001100, 0b00011000, 0b00110000, 0b01100000, 0b11000000, 0b11000110,
			0b11111110,
		],
		3
	), // 2
	pad(3, mirr([0b01111100, 0b11000110, ...same(0b00000110, 2)], [0b00111100, 0b00000110]), 3), // 3
	pad(
		3,
		[0b00001100, 0b00011100, 0b00111100, 0b01101100, 0b11001100, 0b11111110, ...same(0b00001100, 3), 0b00011110],
		3
	), // 4
	pad(3, [0b11111110, ...same(0b11000000, 3), 0b11111100, ...same(0b00000110, 3), 0b11000110, 0b01111100], 3), // 5
	pad(3, [0b00111000, 0b01100000, ...same(0b11000000, 2), 0b11111100, ...same(0b11000110, 4), 0b01111100], 3), // 6
	pad(3, [0b11111110, 0b11000110, ...same(0b00000110, 2), 0b00001100, 0b00011000, ...same(0b00110000, 4)], 3), // 7
	pad(3, mirr([0b01111100, ...same(0b11000110, 3)], [0b01111100, 0b11000110]), 3), // 8
	pad(3, [0b01111100, ...same(0b11000110, 4), 0b01111110, ...same(0b00000110, 2), 0b00001100, 0b01111000], 3), // 9

	pad(8, [0b00001100, 0b00001100, 0b0000000, 0b0000000, 0b00001100, 0b00001100], 2), // :
	pad(8, [0b00001100, 0b00001100, 0b0000000, 0b0000000, 0b00001100, 0b00001100, 0b00000100, 0b00001000], 0), // ;
	pad(8, [...mirr([0b00000011, 0b00001100], [0b00010000])], 3), // <
	pad(9, [0b00011111, 0b00000000, 0b00011111], 4), // =
	pad(8, [...mirr([0b00011000, 0b00000110], [0b00000001])], 3), // >
	pad(6, [0b00001110, 0b00010001, 0b00000001, 0b00000010, 0b00000100, 0b00000100, 0b00000000, 0b00000100], 2), // ?
	pad(16, []), // @

	/* A-Z */
	pad(3, [0b00010000, 0b00111000, 0b01101100, ...same(0b11000110, 2), 0b11111110, ...same(0b11000110, 4)], 3), // A
	pad(3, mirr([0b11111100, ...same(0b01100110, 3)], [0b01111100, 0b01100110]), 3), // B
	pad(3, mirr([0b00111100, 0b01100110, 0b11000010], same(0b11000000, 4)), 3), // C
	pad(3, mirr([0b11111000, 0b01101100, 0b01100110], same(0b01100110, 4)), 3), // D
	pad(3, mirr([0b11111110, 0b01100010, 0b01100000], [0b01101000, 0b01111000, 0b01101000, 0b01100000]), 3), // E
	pad(
		3,
		[0b11111110, 0b01100010, 0b01100000, 0b01101000, 0b01111000, 0b01101000, ...same(0b01100000, 3), 0b11110000],
		3
	), // F
	pad(
		3,
		[
			0b00111100,
			0b01100110,
			0b11000010,
			...same(0b11000000, 1),
			0b11001110,
			...same(0b11000110, 3),
			0b01100110,
			0b00111010,
		],
		3
	), // G
	pad(3, mirr(same(0b11000110, 4), [0b11111110, 0b11000110]), 3), // H
	pad(3, mirr([0b01111000], same(0b00110000, 8)), 3), // I
	pad(3, [0b00011110, ...same(0b00001100, 5), ...same(0b11001100, 3), 0b01111000], 3), // J
	pad(3, mirr([0b11100110, ...same(0b01100110, 2), 0b01101100, 0b01111000]), 3), // K
	pad(3, [0b11110000, ...same(0b01100000, 7), 0b01100010, 0b11111110], 3), // L
	pad(3, [0b11000110, 0b11101110, ...same(0b11111110, 2), 0b11010110, ...same(0b11000110, 5)], 3), // M
	pad(3, [0b11000110, 0b11100110, 0b11110110, 0b11111110, 0b11011110, 0b11001110, ...same(0b11000110, 4)], 3), // N
	pad(3, mirr([0b01111100], same(0b11000110, 8)), 3), // O
	pad(3, [0b11111100, ...same(0b01100110, 3), 0b01111100, ...same(0b01100000, 4), 0b11110000], 3), // P
	pad(3, [0b01111100, ...same(0b11000110, 6), 0b11010110, 0b11011110, 0b01111100, 0b00001100], 2), // Q
	pad(3, [0b11111100, ...same(0b01100110, 3), 0b01111100, 0b01101100, ...same(0b01100110, 3), 0b11100110], 3), // R
	pad(3, mirr([0b01111100, ...same(0b11000110, 2)], [0b01100000, 0b00111000, 0b00001100, 0b11000110]), 3), // S
	pad(3, [...same(0b01111110, 2), 0b01011010, ...same(0b00011000, 6), 0b00111100], 3), // T
	pad(3, [...same(0b11000110, 9), 0b01111100], 3), // U
	pad(3, [...same(0b11000110, 7), 0b01101100, 0b00111000, 0b00010000], 3), // V
	pad(3, [...same(0b11000110, 4), ...same(0b11010110, 3), 0b11111110, ...same(0b11101110, 1), 0b01101100], 3), // W
	pad(3, mirr([...same(0b11000110, 2), 0b01101100, 0b01111100, 0b00111000]), 3), // X
	pad(3, [...same(0b01100110, 4), 0b00111100, ...same(0b00011000, 4), 0b00111100], 3), // Y
	pad(
		3,
		[
			0b11111110, 0b10000110, 0b00000110, 0b00001100, 0b00011000, 0b00110000, 0b01100000, 0b11000000, 0b11000010,
			0b11111110,
		],
		2
	), // Z

	pad(6, [0b00001110, ...same(0b00001000, 6), 0b00001110], 2), // [
	pad(6, [0b00010000, 0b00010000, 0b00001000, 0b00001000, 0b00000100, 0b00000100, 0b00000010, 0b00000010], 2), // \
	pad(6, [0b00001110, ...same(0b00000010, 6), 0b00001110], 2), // ]
	pad(6, [0b00000100, 0b00001010, 0b00010001], 7), // ^
	pad(13, [0b00011111], 2), // _
	pad(6, [0b00001000, 0b000000100], 8), // `

	/* a-z */
	pad(7, [0b01111000, 0b00001100, 0b01111100, ...same(0b11001100, 3), 0b01110110], 3), // a
	pad(
		3,
		[0b11100000, ...same(0b01100000, 2), 0b01111000, 0b01101100, ...same(0b01100110, 3), 0b01100110, 0b01111100],
		3
	), // b
	pad(6, mirr([0b01111100, 0b11000110], same(0b11000000, 3)), 3), // c
	pad(3, [0b00011100, ...same(0b00001100, 2), 0b00111100, 0b01101100, ...same(0b11001100, 4), 0b01110110], 3), // d
	pad(6, [0b01111100, 0b11000110, 0b11111110, ...same(0b11000000, 2), 0b11000110, 0b01111100], 3), // e
	pad(
		3,
		[0b00011100, 0b00110110, 0b00110010, ...same(0b00110000, 2), 0b01111000, ...same(0b00110000, 3), 0b01111000],
		3
	), // f
	pad(6, [0b01110110, ...same(0b11001100, 4), 0b01111100, 0b00001100, 0b11001100, 0b01111000], 1), //g
	pad(3, [0b11100000, ...same(0b01100000, 2), 0b01101100, 0b01110110, ...same(0b01100110, 4), 0b11100110], 3), // h
	pad(3, [...same(0b00011000, 2), 0b00000000, 0b00111000, ...same(0b00011000, 5), 0b00111100], 3), // i
	pad(
		3,
		[...same(0b00001100, 2), 0b00000000, 0b00011100, ...same(0b00001100, 6), ...same(0b11001100, 2), 0b01111000],
		0
	), // j
	pad(
		3,
		[
			0b11100000,
			...same(0b01100000, 2),
			0b01100110,
			0b01101100,
			...same(0b01111000, 2),
			0b01101100,
			0b01100110,
			0b11100110,
		],
		3
	), // k
	pad(3, [0b00111000, ...same(0b00011000, 8), 0b00111100], 3), // l
	pad(6, [0b11101100, 0b11111110, ...same(0b11010110, 4), 0b11000110], 3), // m
	pad(6, [0b11011100, ...same(0b01100110, 6)], 3), // n
	pad(6, mirr([0b01111100], same(0b11000110, 5)), 3), // o
	pad(6, [0b11011100, ...same(0b01100110, 4), 0b01111100, ...same(0b01100000, 2), 0b11110000], 1), // p
	pad(6, [0b01110110, ...same(0b11001100, 4), 0b01111100, ...same(0b00001100, 2), 0b00011110], 1), // q
	pad(6, [0b11011100, 0b01110110, 0b01100110, ...same(0b01100000, 3), 0b11110000], 3), // r
	pad(6, [0b01111100, 0b11000110, 0b01100000, 0b00111000, 0b0001100, 0b11000110, 0b01111100], 3), // s
	pad(3, [0b00010000, ...same(0b00110000, 2), 0b11111100, ...same(0b00110000, 4), 0b00110110, 0b00011100], 3), // t
	pad(6, [...same(0b11001100, 6), 0b01110110], 3), // u
	pad(6, [...same(0b11000110, 5), 0b01101100, 0b00111000], 3), // v
	pad(6, [...same(0b11000110, 2), ...same(0b11010110, 3), 0b11111110, 0b01101100], 3), // w
	pad(6, mirr([0b11000110, 0b01101100], same(0b00111000, 3)), 3), // x
	pad(6, [...same(0b11000110, 6), 0b01111110, ...same(0b00000110, 2), 0b01111100], 0), // y
	pad(6, [0b11111110, 0b11001100, 0b00011000, 0b00110000, 0b01100000, 0b11000110, 0b11111110], 2), // z

	pad(6, mirr([0b00000011, 0b00000100, 0b00000100], [0b00001000, 0b00000100]), 2), // {
	pad(6, same(0b00000100, 8), 2), // |
	pad(6, mirr([0b00011000, 0b00000100, 0b00000100], [0b00000010, 0b00000100]), 2), // }
	pad(16, []), // ~
].flat();
