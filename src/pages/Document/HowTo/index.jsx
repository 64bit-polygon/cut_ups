import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { InfoPage } from "../../../components/InfoPage";
import { Icon } from "../../../components/Icon";

const FILE_MENU_ICONS = [
  ["save", "Save doc to the cloud"],
  ["download", "Downloads .rtf file"],
  ["document", "Makes a new document that will open in a new tab"],
  ["trash", "Deletes the current doc"]
];

const STYLE_MENU_ICONS = [
  ["typeface", "Changes font"],
  ["12pt", "Changes size"],
  ["bold", "Makes text bold"],
  ["italic", "Makes text italic"],
  ["alignment", "Changes paragraph alignment"],
  ["textColor", "Changes text's color"],
  ["backgroundColor", "Changes text's background color"]
];

const IconListItem = ({
  iconName,
  text,
  isHeader,
  children
}) => (
  <div className={styles.iconListItem}>
    <div className={cn(styles.iconListLine, {[styles.header]: isHeader})}>
      <dt className={cn(styles.iconWrap, styles[iconName])}>
        <Icon name={iconName} className={cn(styles.icon, styles[iconName])} isBordered={false} />
      </dt>
      <dd>
        <div>{text}</div>
      </dd>
    </div>
  {children && (
    <div>
      {children}
    </div>
  )}
  </div>
);

const IconList = ({ list }) => (
  <dl className={styles.iconList}>
    {list.map( ([iconName, text]) => (
      <IconListItem
        iconName={iconName}
        text={text}
        key={iconName + text}
      />
    ))}
  </dl>
);

export const HowTo = ({isVisible, setVisibility}) => (
  <InfoPage
    isVisible={isVisible}
    heading="Instructions"
    closePage={() => setVisibility(false)}
  >
    <>
      <p>The top-most text area change's the document's title.</p>
      <p>Type in the text areas as you would in any other text editor.</p>
      <dl>
        <IconListItem iconName="folder" text="File menu" isHeader={true}>
          <IconList list={FILE_MENU_ICONS} />
        </IconListItem>
        <IconListItem iconName="style" text="Text style menu" isHeader={true}>
          <IconList list={STYLE_MENU_ICONS} />
        </IconListItem>
        <IconListItem
          iconName="sourcesShow"
          text="Highlights the different authors of the text [if applicable]"
        />
        <IconListItem
          iconName="sourcesHide"
          text="Un-highlights the different authors of the text [if applicable]"
        />
      </dl>
    </>
  </InfoPage>
);
