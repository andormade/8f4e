import { pad, same, mirr } from '../utils';

export default [
	pad(10, []), // Space
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(10, []), //
	pad(0, [...same(0b00000100, 6), 0b00000000, 0b00000100], 2), // !
	pad(0, [...same(0b00001010, 3), ...same(0b00000000, 5)], 2), // "
	pad(0, [...same(0b00001010, 2), 0b00011111, ...same(0b00001010, 2), 0b00011111, ...same(0b00001010, 2)], 2), // #
	pad(0, [0b00000100, ...mirr([0b00001110, 0b00010101], [0b00010100, 0b00001110, 0b0000101]), 0b00000100], 1), // $
	pad(
		0,
		[0b00001000, 0b00010100, 0b00001001, 0b00000010, 0b00000100, 0b00001000, 0b00010010, 0b00000101, 0b00000010],
		1
	), // %
	pad(0, [0b00001100, 0b00010010, 0b00010000, 0b00001000, 0b00010101, 0b00010010, 0b00010010, 0b00001101], 2), // &
	pad(0, [0b00000100, 0b00000100], 8), // '
	pad(0, mirr([0b00000010, 0b00000100, 0b00000100, 0b00001000]), 2), // (
	pad(0, mirr([0b00001000, 0b00000100, 0b00000100, 0b00000010]), 2), // )
	pad(0, mirr([0b000000100, 0b00010101, 0b00001110]), 4), // *
	pad(2, [0b00000100, 0b00000100, 0b00011111, 0b00000100, 0b00000100], 3), // +
	pad(6, [0b00001100, 0b00001100, 0b00000100, 0b00001000], 0), // ,
	pad(4, [0b00011111], 5), // -
	pad(6, [0b00001100, 0b00001100], 2), // .
	pad(0, [0b00000001, 0b00000001, 0b00000010, 0b00000010, 0b00000100, 0b00000100, 0b00001000, 0b00001000], 2), // /

	/* 0-9 */
	pad(0, mirr([0b00001110, 0b00010001], [0b00010011, 0b00010101, 0b00011001, 0b00010001]), 2), // 0
	pad(0, [0b00000100, 0b00001100, 0b00010100, ...same(0b00000100, 4), 0b00011111], 2), // 1
	pad(0, [0b00001110, 0b00010001, 0b00000001, 0b00000010, 0b00000100, 0b00001000, 0b00010000, 0b00011111], 2), // 2
	pad(0, mirr([0b00001110, 0b00010001, 0b00000001], [0b00000110, 0b00000001]), 2), // 3
	pad(0, [0b00000010, 0b00000110, 0b00001010, 0b00010010, 0b00011111, ...same(0b00000010, 3)], 2), // 4
	pad(0, [0b00011111, 0b00010000, 0b00011110, 0b00010001, ...same(0b00000001, 3), 0b0001111], 2), // 5
	pad(0, [0b00000110, 0b00001000, 0b00010000, 0b00011110, ...same(0b00010001, 3), 0b00001110], 2), // 6
	pad(0, [0b00011111, 0b00010001, 0b00000001, ...same(0b00000010, 2), ...same(0b00000100, 3)], 2), // 7
	pad(0, mirr([0b00001110, ...same(0b00010001, 2)], [0b00001110, 0b00010001]), 2), // 8
	pad(0, [0b00001110, ...same(0b00010001, 3), 0b00001111, 0b00000001, 0b00000010, 0b00001100], 2), // 9

	pad(2, [0b00001100, 0b00001100, 0b0000000, 0b0000000, 0b00001100, 0b00001100], 2), // :
	pad(2, [0b00001100, 0b00001100, 0b0000000, 0b0000000, 0b00001100, 0b00001100, 0b00000100, 0b00001000], 0), // ;
	pad(2, [...mirr([0b00000011, 0b00001100], [0b00010000])], 3), // <
	pad(3, [0b00011111, 0b00000000, 0b00011111], 4), // =
	pad(2, [...mirr([0b00011000, 0b00000110], [0b00000001])], 3), // >
	pad(0, [0b00001110, 0b00010001, 0b00000001, 0b00000010, 0b00000100, 0b00000100, 0b00000000, 0b00000100], 2), // ?
	pad(10, []), // @

	/* A-Z */
	pad(0, [...same(0b00000100, 3), ...same(0b00001010, 2), 0b00011111, ...same(0b00010001, 2)], 2), // A
	pad(0, mirr([0b00011110, ...same(0b00010001, 2)], [0b00011110, 0b00010001]), 2), // B
	pad(0, mirr([0b00001110, 0b00010001], same(0b00010000, 4)), 2), // C
	pad(0, mirr([0b00011100, 0b00010010], same(0b00010001, 4)), 2), // D
	pad(0, mirr([0b00011111, ...same(0b00010000, 2)], [0b00011110, 0b00010000]), 2), // E
	pad(0, [0b00011111, ...same(0b00010000, 2), 0b00011110, ...same(0b00010000, 4)], 2), // F
	pad(0, mirr([0b00001110, 0b00010001], [...same(0b00010000, 2), 0b00010011, 0b00010001]), 2), // G
	pad(0, mirr(same(0b00010001, 3), [0b00011111, 0b00010001]), 2), // H
	pad(0, mirr([0b00001110], same(0b00000100, 6)), 2), // I
	pad(0, [0b00001111, ...same(0b00000001, 4), ...same(0b00010001, 2), 0b00001110], 2), // J
	pad(0, mirr([0b00010001, 0b00010010, 0b00010100, 0b00011000]), 2), // K
	pad(0, [...same(0b00010000, 7), 0b00011111], 2), // L
	pad(0, [0b00010001, ...same(0b00011011, 2), 0b00010101, ...same(0b00010001, 4)], 2), // M
	pad(0, [0b00010001, ...same(0b00011001, 2), ...same(0b00010101, 2), ...same(0b00010011, 2), 0b00010001], 2), // N
	pad(0, mirr([0b00001110], same(0b00010001, 6)), 2), // O
	pad(0, [...mirr([0b00011110], same(0b00010001, 3)), ...same(0b00010000, 3)], 2), // P
	[...mirr([0b00001110], same(0b00010001, 6)), 0b00000010, 0b00000001], // Q
	pad(0, [...mirr([0b00011110], same(0b00010001, 3)), 0b00010100, 0b00010010, 0b00010001], 2), // R
	pad(0, mirr([0b00001110, 0b00010001], [0b00010000, 0b00001110, ...same(0b00000001, 2)]), 2), // S
	pad(0, [0b00011111, ...same(0b00000100, 7)], 2), // T
	pad(0, [...same(0b00010001, 7), 0b00001110], 2), // U
	pad(0, [...same(0b00010001, 4), ...same(0b00001010, 2), ...same(0b00000100, 2)], 2), // V
	pad(0, [...same(0b00010001, 2), ...same(0b00010101, 3), ...same(0b00001010, 3)], 2), // W
	pad(0, mirr([...same(0b00010001, 2), 0b00001010, 0b00000100]), 2), // X
	pad(0, [...same(0b00010001, 2), ...same(0b00001010, 2), ...same(0b00000100, 4)], 2), // Y
	pad(0, [0b00011111, 0b00000001, 0b00000010, ...same(0b00000100, 2), 0b00001000, 0b00010000, 0b00111111], 2), // Z

	pad(0, [0b00001110, ...same(0b00001000, 6), 0b00001110], 2), // [
	pad(0, [0b00010000, 0b00010000, 0b00001000, 0b00001000, 0b00000100, 0b00000100, 0b00000010, 0b00000010], 2), // \
	pad(0, [0b00001110, ...same(0b00000010, 6), 0b00001110], 2), // ]
	pad(0, [0b00000100, 0b00001010, 0b00010001], 7), // ^
	pad(7, [0b00011111], 2), // _
	pad(0, [0b00001000, 0b000000100], 8), // `

	/* a-z */
	pad(2, [0b00001110, 0b00010001, ...same(0b00010001, 2), 0b00010011, 0b0001101], 2), // a
	pad(0, [0b00010000, 0b00010000, 0b00010110, 0b00011001, 0b00010001, 0b00010001, 0b00010001, 0b00011110], 2), // b
	pad(2, mirr([0b00001110, 0b00010001], same(0b0010000, 2)), 2), // c
	pad(0, [0b00000001, 0b00000001, 0b00001111, ...same(0b00010001, 3), 0b00010011, 0b00001101], 2), // d
	pad(2, [0b00001110, 0b00010001, 0b00011111, 0b00010000, 0b00010001, 0b00001110], 2), // e
	pad(0, [0b00000110, 0b00001000, 0b00011110, ...same(0b00001000, 5)], 2), // f
	pad(2, [0b00001111, ...same(0b00010001, 3), 0b00010011, 0b00001101, 0b0000000, 0b00001110]), //g
	pad(0, [...same(0b00010000, 2), 0b00010110, 0b00011001, ...same(0b00010001, 4)], 2), // h
	pad(0, [0b00000100, 0b00000000, 0b00001100, ...same(0b00000100, 4), 0b00000110], 2), // i
	pad(0, [0b00000010, 0b00000000, 0b00001110, ...same(0b00000010, 5), 0b00011100], 1), // j
	pad(0, [...same(0b00010000, 2), 0b00010010, 0b00010100, 0b00011000, 0b00010100, 0b00010010, 0b00010001], 2), // k
	pad(0, [...same(0b00000100, 7), 0b00000110], 2), // l
	pad(2, [0b00011010, ...same(0b00010101, 5)], 2), // m
	pad(2, [0b00010110, 0b00011001, ...same(0b00010001, 4)], 2), // n
	pad(2, mirr([0b00001110], same(0b00010001, 4)), 2), // o
	pad(2, [0b00010110, 0b00011001, ...same(0b00010001, 3), 0b00011110, ...same(0b00010000, 2)]), // p
	pad(2, [0b00001111, ...same(0b00010001, 3), 0b00010011, 0b00001101, ...same(0b00000001, 2)]), // q
	pad(2, [0b00011011, 0b00001100, ...same(0b00001000, 3), 0b00011100], 2), // r
	pad(2, [0b00001110, 0b00010001, 0b00001100, 0b00000010, 0b00010001, 0b00001110], 2), // s
	pad(0, [...same(0b00001000, 2), 0b00011110, ...same(0b00001000, 3), 0b00001001, 0b00000110], 2), // t
	pad(2, [...same(0b00010001, 4), 0b00010011, 0b00001101], 2), // u
	pad(2, [...same(0b00010001, 2), ...same(0b00001010, 2), ...same(0b00000100, 2)], 2), // v
	pad(2, [...same(0b00010001, 2), ...same(0b00010101, 2), ...same(0b00001010, 2)], 2), // w
	pad(2, mirr([0b00010001, 0b00001010, 0b00000100]), 2), // x
	pad(2, [...same(0b00010001, 2), ...same(0b00001010, 2), ...same(0b00000100, 2), 0b00001000, 0b00010000]), // y
	pad(2, [0b00011111, 0b00000010, 0b00000100, 0b00001000, 0b00010000, 0b00111111], 2), // z

	pad(0, mirr([0b00000011, 0b00000100, 0b00000100], [0b00001000, 0b00000100]), 2), // {
	pad(0, same(0b00000100, 8), 2), // |
	pad(0, mirr([0b00011000, 0b00000100, 0b00000100], [0b00000010, 0b00000100]), 2), // }
	pad(10, []), // ~
].flat();
