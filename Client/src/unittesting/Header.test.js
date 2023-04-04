import Header from "../components/header/Header";
import renderer from 'react-test-renderer';

const data = JSON.parse(localStorage.getItem('user'));
// Snapshot test for Header component
describe("Header", () => {
    it("should render without crashing", () => {
        const wrapper = renderer.create(<Header data={data} />);
        const tree = wrapper.toJSON();
        expect(tree).toMatchSnapshot();
    });
})
 
