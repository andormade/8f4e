import moduleTypeGenerator from '../../modules/offset';

it('generates correct module type descriptor', () => {
	expect(moduleTypeGenerator()).toMatchSnapshot();
});
