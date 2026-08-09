import requests

try:
    with open('ai-model/tomato/best.pt', 'rb') as f:
        pass
    print("Found a file to upload as dummy (will fail CV2 decode, let's use a real image instead if we can find one)")
except FileNotFoundError:
    pass
