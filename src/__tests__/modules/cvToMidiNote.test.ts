import moduleTypeGenerator from '../../modules/cvToMidiNote';

it('generates correct module type descriptor', () => {
	expect(moduleTypeGenerator()).toMatchSnapshot();
});
