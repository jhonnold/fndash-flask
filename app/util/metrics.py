import time

class Metrics(dict):
    def __init__(self):
        self.start_time = time.time()

    def reset(self):
        for k in self.keys():
            self[k] = 0
        
        self.start_time = time.time()

    def inc(self, k):
        self[k] += 1