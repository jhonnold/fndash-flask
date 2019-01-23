from datetime import timedelta

def strftime(value, format='%c', adjust=0):
    value += timedelta(hours=adjust)
    return value.strftime(format)