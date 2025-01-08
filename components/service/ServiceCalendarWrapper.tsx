import SelectCalendar from './ServiceCalendar';

interface ServiceDateProps {
    fetcehdDate?: Date;
}

export default function ServiceCalendarWrapper({
    fetcehdDate,
}: ServiceDateProps) {
    return <SelectCalendar fetcehdDate={fetcehdDate} />;
}
