import SelectCalendar from './ServiceCalendar';

export default function ServiceCalendarWrapper() {
    return (
        <section>
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black-600">
                When did you start feeling this way?
            </h1>
            <SelectCalendar />
        </section>
    );
}
