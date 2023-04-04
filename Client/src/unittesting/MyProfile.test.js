import renderer from 'react-test-renderer';
import MyProfile from "../components/profile/MyProfile";


// let userDetail = localStorage.getItem('user');
// console.log(userDetail);
// if (typeof window !== 'undefined') {
//     userDetail = localStorage.getItem('user');
// }
let userDetail = JSON.parse(localStorage.getItem('user'));
userDetail === null ? userDetail = { Name: 'Name', Email: 'Email' } : userDetail = userDetail;

describe('MyProfile', () => {
    it('match snapshot', () => {
        // Snapshot testing
        const component = renderer.create(<MyProfile data={userDetail}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});