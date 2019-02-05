import datetime

EST = -5
TIMEZONE = EST

ONE_DAY = datetime.timedelta(days=1)

def get_today_range():
    current_time_adjust = datetime.datetime.today() + datetime.timedelta(
        hours=TIMEZONE)
    start_date = datetime.datetime(
        year=current_time_adjust.year,
        month=current_time_adjust.month,
        day=current_time_adjust.day) - datetime.timedelta(hours=TIMEZONE)
    end_date = start_date + ONE_DAY

    return start_date, end_date