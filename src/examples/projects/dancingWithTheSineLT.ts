import { Project } from '../../../packages/editor/src/state/types';

const project: Project = {
	title: 'Dancing with the Sine Lookup Table',
	author: 'Andor Polgar',
	description: '',
	codeBlocks: [
		{
			code: [
				'module sineLT',
				'',
				'float sin0 0.0000',
				'float sin1 0.0246',
				'float sin2 0.0493',
				'float sin3 0.0739',
				'float sin4 0.0984',
				'float sin5 0.1229',
				'float sin6 0.1473',
				'float sin7 0.1716',
				'float sin8 0.1958',
				'float sin9 0.2199',
				'float sin10 0.2439',
				'float sin11 0.2677',
				'float sin12 0.2914',
				'float sin13 0.3149',
				'float sin14 0.3382',
				'float sin15 0.3612',
				'float sin16 0.3841',
				'float sin17 0.4067',
				'float sin18 0.4291',
				'float sin19 0.4512',
				'float sin20 0.4731',
				'float sin21 0.4947',
				'float sin22 0.5159',
				'float sin23 0.5369',
				'float sin24 0.5575',
				'float sin25 0.5778',
				'float sin26 0.5977',
				'float sin27 0.6173',
				'float sin28 0.6365',
				'float sin29 0.6553',
				'float sin30 0.6737',
				'float sin31 0.6917',
				'float sin32 0.7093',
				'float sin33 0.7264',
				'float sin34 0.7431',
				'float sin35 0.7594',
				'float sin36 0.7752',
				'float sin37 0.7905',
				'float sin38 0.8054',
				'float sin39 0.8197',
				'float sin40 0.8336',
				'float sin41 0.8470',
				'float sin42 0.8598',
				'float sin43 0.8721',
				'float sin44 0.8839',
				'float sin45 0.8952',
				'float sin46 0.9059',
				'float sin47 0.9160',
				'float sin48 0.9256',
				'float sin49 0.9347',
				'float sin50 0.9432',
				'float sin51 0.9511',
				'float sin52 0.9584',
				'float sin53 0.9651',
				'float sin54 0.9713',
				'float sin55 0.9768',
				'float sin56 0.9818',
				'float sin57 0.9862',
				'float sin58 0.9900',
				'float sin59 0.9932',
				'float sin60 0.9957',
				'float sin61 0.9977',
				'float sin62 0.9991',
				'float sin63 0.9998',
				'float sin64 1.0000',
				'float sin65 0.9995',
				'float sin66 0.9985',
				'float sin67 0.9968',
				'float sin68 0.9945',
				'float sin69 0.9916',
				'float sin70 0.9882',
				'float sin71 0.9841',
				'float sin72 0.9794',
				'float sin73 0.9741',
				'float sin74 0.9683',
				'float sin75 0.9618',
				'float sin76 0.9548',
				'float sin77 0.9472',
				'float sin78 0.9390',
				'float sin79 0.9302',
				'float sin80 0.9209',
				'float sin81 0.9110',
				'float sin82 0.9006',
				'float sin83 0.8896',
				'float sin84 0.8781',
				'float sin85 0.8660',
				'float sin86 0.8534',
				'float sin87 0.8403',
				'float sin88 0.8267',
				'float sin89 0.8126',
				'float sin90 0.7980',
				'float sin91 0.7829',
				'float sin92 0.7674',
				'float sin93 0.7513',
				'float sin94 0.7348',
				'float sin95 0.7179',
				'float sin96 0.7005',
				'float sin97 0.6827',
				'float sin98 0.6645',
				'float sin99 0.6459',
				'float sin100 0.6269',
				'float sin101 0.6075',
				'float sin102 0.5878',
				'float sin103 0.5677',
				'float sin104 0.5472',
				'float sin105 0.5264',
				'float sin106 0.5053',
				'float sin107 0.4839',
				'float sin108 0.4622',
				'float sin109 0.4402',
				'float sin110 0.4180',
				'float sin111 0.3955',
				'float sin112 0.3727',
				'float sin113 0.3497',
				'float sin114 0.3265',
				'float sin115 0.3032',
				'float sin116 0.2796',
				'float sin117 0.2558',
				'float sin118 0.2319',
				'float sin119 0.2079',
				'float sin120 0.1837',
				'float sin121 0.1595',
				'float sin122 0.1351',
				'float sin123 0.1107',
				'float sin124 0.0861',
				'float sin125 0.0616',
				'float sin126 0.0370',
				'float sin127 0.0123',
				'float sin128 -0.0123',
				'float sin129 -0.0370',
				'float sin130 -0.0616',
				'float sin131 -0.0861',
				'float sin132 -0.1107',
				'float sin133 -0.1351',
				'float sin134 -0.1595',
				'float sin135 -0.1837',
				'float sin136 -0.2079',
				'float sin137 -0.2319',
				'float sin138 -0.2558',
				'float sin139 -0.2796',
				'float sin140 -0.3032',
				'float sin141 -0.3265',
				'float sin142 -0.3497',
				'float sin143 -0.3727',
				'float sin144 -0.3955',
				'float sin145 -0.4180',
				'float sin146 -0.4402',
				'float sin147 -0.4622',
				'float sin148 -0.4839',
				'float sin149 -0.5053',
				'float sin150 -0.5264',
				'float sin151 -0.5472',
				'float sin152 -0.5677',
				'float sin153 -0.5878',
				'float sin154 -0.6075',
				'float sin155 -0.6269',
				'float sin156 -0.6459',
				'float sin157 -0.6645',
				'float sin158 -0.6827',
				'float sin159 -0.7005',
				'float sin160 -0.7179',
				'float sin161 -0.7348',
				'float sin162 -0.7513',
				'float sin163 -0.7674',
				'float sin164 -0.7829',
				'float sin165 -0.7980',
				'float sin166 -0.8126',
				'float sin167 -0.8267',
				'float sin168 -0.8403',
				'float sin169 -0.8534',
				'float sin170 -0.8660',
				'float sin171 -0.8781',
				'float sin172 -0.8896',
				'float sin173 -0.9006',
				'float sin174 -0.9110',
				'float sin175 -0.9209',
				'float sin176 -0.9302',
				'float sin177 -0.9390',
				'float sin178 -0.9472',
				'float sin179 -0.9548',
				'float sin180 -0.9618',
				'float sin181 -0.9683',
				'float sin182 -0.9741',
				'float sin183 -0.9794',
				'float sin184 -0.9841',
				'float sin185 -0.9882',
				'float sin186 -0.9916',
				'float sin187 -0.9945',
				'float sin188 -0.9968',
				'float sin189 -0.9985',
				'float sin190 -0.9995',
				'float sin191 -1.0000',
				'float sin192 -0.9998',
				'float sin193 -0.9991',
				'float sin194 -0.9977',
				'float sin195 -0.9957',
				'float sin196 -0.9932',
				'float sin197 -0.9900',
				'float sin198 -0.9862',
				'float sin199 -0.9818',
				'float sin200 -0.9768',
				'float sin201 -0.9713',
				'float sin202 -0.9651',
				'float sin203 -0.9584',
				'float sin204 -0.9511',
				'float sin205 -0.9432',
				'float sin206 -0.9347',
				'float sin207 -0.9256',
				'float sin208 -0.9160',
				'float sin209 -0.9059',
				'float sin210 -0.8952',
				'float sin211 -0.8839',
				'float sin212 -0.8721',
				'float sin213 -0.8598',
				'float sin214 -0.8470',
				'float sin215 -0.8336',
				'float sin216 -0.8197',
				'float sin217 -0.8054',
				'float sin218 -0.7905',
				'float sin219 -0.7752',
				'float sin220 -0.7594',
				'float sin221 -0.7431',
				'float sin222 -0.7264',
				'float sin223 -0.7093',
				'float sin224 -0.6917',
				'float sin225 -0.6737',
				'float sin226 -0.6553',
				'float sin227 -0.6365',
				'float sin228 -0.6173',
				'float sin229 -0.5977',
				'float sin230 -0.5778',
				'float sin231 -0.5575',
				'float sin232 -0.5369',
				'float sin233 -0.5159',
				'float sin234 -0.4947',
				'float sin235 -0.4731',
				'float sin236 -0.4512',
				'float sin237 -0.4291',
				'float sin238 -0.4067',
				'float sin239 -0.3841',
				'float sin240 -0.3612',
				'float sin241 -0.3382',
				'float sin242 -0.3149',
				'float sin243 -0.2914',
				'float sin244 -0.2677',
				'float sin245 -0.2439',
				'float sin246 -0.2199',
				'float sin247 -0.1958',
				'float sin248 -0.1716',
				'float sin249 -0.1473',
				'float sin250 -0.1229',
				'float sin251 -0.0984',
				'float sin252 -0.0739',
				'float sin253 -0.0493',
				'float sin254 -0.0246',
				'float sin255 -0.0000',
				'',
				'moduleEnd',
			],
			x: -68,
			y: -9,
			isOpen: true,
		},
		{
			code: [
				'module dancer1',
				'',
				'; Can yor IDE do this?',
				'',
				'float* sin &sineLT.sin0',
				'float* last &sineLT.sin255',
				'float* first &sineLT.sin0',
				'int offset ',
				'',
				'offset y offset',
				'',
				'push &sin',
				'push sin',
				'push 4',
				'add',
				'store',
				'',
				'push sin',
				'push last',
				'equal',
				'if void',
				' push &sin',
				' push first',
				' store',
				'ifEnd',
				'',
				'push &offset',
				'push *sin',
				'push 100.0',
				'mul',
				'castToInt',
				'store',
				'',
				'moduleEnd',
			],
			x: -34,
			y: -9,
			isOpen: true,
		},
		{
			code: [
				'module dancer2',
				'float* sin &sineLT.sin32',
				'float* last &sineLT.sin255',
				'float* first &sineLT.sin0',
				'int offset ',
				'',
				'offset y offset',
				'',
				'push &sin',
				'push sin',
				'push 4',
				'add',
				'store',
				'',
				'push sin',
				'push last',
				'equal',
				'if void',
				' push &sin',
				' push first',
				' store',
				'ifEnd',
				'',
				'push &offset',
				'push *sin',
				'push 100.0',
				'mul',
				'castToInt',
				'store',
				'',
				'moduleEnd',
			],
			x: 1,
			y: -9,
			isOpen: true,
		},
		{
			code: [
				'module dancer3',
				'',
				'float* sin &sineLT.sin64',
				'float* last &sineLT.sin255',
				'float* first &sineLT.sin0',
				'int offset ',
				'',
				'offset y offset',
				'',
				'push &sin',
				'push sin',
				'push 4',
				'add',
				'store',
				'',
				'push sin',
				'push last',
				'equal',
				'if void',
				' push &sin',
				' push first',
				' store',
				'ifEnd',
				'',
				'push &offset',
				'push *sin',
				'push 100.0',
				'mul',
				'castToInt',
				'store',
				'',
				'moduleEnd',
			],
			x: 36,
			y: -9,
			isOpen: true,
		},
		{
			code: [
				'module dancer4',
				'',
				'float* sin &sineLT.sin64',
				'float* last &sineLT.sin255',
				'float* first &sineLT.sin0',
				'float* offsetX &dancer1.offset',
				'',
				'int offsetY',
				'',
				'offset y offsetY',
				'offset x *offsetX',
				'',
				'push &sin',
				'push sin',
				'push 4',
				'add',
				'store',
				'',
				'push sin',
				'push last',
				'equal',
				'if void',
				' push &sin',
				' push first',
				' store',
				'ifEnd',
				'',
				'push &offsetY',
				'push *sin',
				'push 100.0',
				'mul',
				'castToInt',
				'store',
				'',
				'moduleEnd',
			],
			x: 89,
			y: -12,
			isOpen: true,
		},
	],
	viewport: { x: -71, y: -23 },
	rnbo: { patchers: {} },
	sampleRate: 50,
};

export default project;
