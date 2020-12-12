import json, pickle
import numpy as np

# global variables
__loc = None
__data_col = None
__model = None

def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_col.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_col))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 2)

def get_loc_name_util():
    load_saved_artifacts()
    return __loc

def load_saved_artifacts():
    global __data_col
    global __model
    global __loc

    # loading JSON file
    with open("./artifacts/columns.json", 'r') as f:
        __data_col = json.load(f)['data_columns']
        __loc = __data_col[3:]

    # loading model stored in pickle
    with open("./artifacts/home_price_model.pickle", 'rb') as f:
        __model = pickle.load(f)

# if __name__ == "__main__":
#     load_saved_artifacts()
#     print(get_loc_name_util())

#     print(get_estimated_price('1st Phase JP Nagar', 1000, 3, 3))
#     print(get_estimated_price('1st Phase JP Nagar', 1000, 2, 2))
