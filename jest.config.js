module.exports = {
	preset: './jest-presets.js',
	modulePathIgnorePatterns: ['packages', 'dist'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
			diagnostics: {
				warnOnly: true,
			},
		},
	},
	setupFilesAfterEnv: ['./jest.image.ts'],
};
