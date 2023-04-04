import { screen, render, waitFor } from "@testing-library/react";
import LeftCard from "../components/teacher/LeftCard";
import renderer from "react-test-renderer";
const props = {
  isLoading: false,
  onLoding: jest.fn(),
}
describe("LeftCard", () => {
  test("renders error when API call fails", async () => {
    // render(<LeftCard />);
    // render.create(<LeftCard />);
    //    const element = screen.getByRole("heading");
    // await waitFor(() =>
    //  expect(screen.getByRole("heading")).not.toBeInTheDocument();
    //  ,{
      //   timeout: 2000,
      // }
    // );
  });

  // test("snapshot on left card render", () => {
  //   // const wrapper = render.create(<LeftCard loader={props} />);
  //   const wrapper = renderer.create(<LeftCard/>).toJSON();

  //   // const tree = wrapper.toJSON();
  //   expect(wrapper).toMatchSnapshot();
  // });
});
