import styles from "./page.module.scss";
import { EventItem } from "./EventItem";
import { dynamicSort } from "./sortArrayByElementsProperty";

const classNames = {
  permanent: styles.permanent,
  additional: styles.additional,
  concert: styles.concert,
};

interface EventsListProps {
  events: { type: keyof typeof classNames; time: string }[];
  user: any;
}

export const EventsList = ({ events, user }: EventsListProps) => (
  <>
    {events.sort(dynamicSort("time")).map((item, index) => {
      const className = classNames[item.type]; // TypeScript точно знает, что item.type — это ключ из classNames.

      return (
        <EventItem
          key={index}
          className={className}
          index={index}
          user={user}
          item={item}
        />
      );
    })}
  </>
);
