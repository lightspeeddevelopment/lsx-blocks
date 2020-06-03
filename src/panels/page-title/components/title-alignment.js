/**
 * Get registerPlugin.
 */
console.log( wp );
const { __ } = wp.i18n;

const {
	Radio,
	RadioGroup,
} = wp.components;

const {
	useState,
} = wp.element;

const TitleAlignment = () => {
	const [ checked, setChecked ] = useState( '25' );
	return (
		<RadioGroup accessibilityLabel="Width" onChange={ setChecked } checked={ checked }>
			<Radio value="25">25%</Radio>
			<Radio value="50">50%</Radio>
			<Radio value="75">75%</Radio>
			<Radio value="100">100%</Radio>
		</RadioGroup>
	);
};

export default TitleAlignment;
