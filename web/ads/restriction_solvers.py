def solve_age(restriction, params):
    age = int(params["age"])

    if "<" == restriction[0]:
        return age < int(restriction[1:])

    if ">" == restriction[0]:
        return age > int(restriction[1:])

    if "-" not in restriction:
        return True

    range_vals = restriction.split("-")
    return int(range_vals[0]) <= age <= int(range_vals[1])


def solve_gender(restriction, params):
    gender = params["gender"]

    if len(restriction) > 0 and gender[0] != restriction:
        return False
    return True


def solve_country_whitelist(restriction, params):
    country = params["country"]

    if len(restriction) > 0 and country not in restriction:
        return False
    return True


def solve_country_blacklist(restriction, params):
    country = params["country"]

    if len(restriction) > 0 and country in restriction:
        return False
    return True
