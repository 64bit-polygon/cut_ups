import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { showAboutSelector } from "../../state/selectors";
import { InfoPage } from "../../components/InfoPage";

const About = () => {
  const [isVisible, setVisibility] = useRecoilState(showAboutSelector);
  const location = useLocation();

  useEffect(() => {
    if (isVisible) {
      setVisibility(false);
    }
  }, [location]);

  return (
    <InfoPage
      isVisible={isVisible}
      heading="About"
      closePage={() => setVisibility(false)}
    >
      <>
        <h3>What is this?</h3>
        <p>
          This is a text editor web app can be used to create cut ups
          [see below] or new text documents. You can edit the document
          and save it to the cloud or download it as a .rtf document.
        </p>
        <h3>What are cut ups?</h3>
        <p>
          The cut up technique is a chance-based literary technique in
          which a text is cut up and rearranged to create a new text. The
          concept can be traced to at least the Dadaists of the 1920s, but
          was popularized in the late 1950s and early 1960s by writer
          William S. Burroughs, and has since been used in a wide variety of contexts
          [<a href="https://en.wikipedia.org/wiki/Cut-up_technique" target="_blank">source</a>].
          The texts used to make the cut on this site break each text
          down to separate lines of around 85 glyphs then folds the two
          sources together like shuffling a deck of cards.
        </p>
        <h3>How do I use this?</h3>
        <ol>
          <li>Click the arrow button on the main page.</li>
          <li>Select your first source. This is optional. You can input text
            or select a source. Scroll down.</li>
          <li>Select your second source. This is optional. Scroll down.</li>
          <li>If you didn't select a source you'll get a blank document; if
            you selected one source the document will be just that; if you
            selected two different sources you'll get a cut up document.</li>
          <li>Select a name. Select a password if you'd like the document
            to be lockable. Click "create document".</li>
          <li>You will now see your new document.</li>
          <li>Copy the url to access it later on.</li>
        </ol>
      </>
    </InfoPage>
  )
};

export default About;