def solve_age(restriction, params):
    if restriction is None:
        return True

    age = int(params["age"])

    restrictions = restriction.split(",")

    for r in restrictions:
        if solve_indiv_age(r, age):
            return True

    return False


def solve_indiv_age(restriction, age):
    restriction = restriction.strip()

    if "<" == restriction[0]:
        return age < int(restriction[1:])

    if ">" == restriction[0]:
        return age > int(restriction[1:])

    if "-" not in restriction and ":" not in restriction:
        return True

    delimiter = "-"
    if ":" in restriction:
        delimiter = ":"

    range_vals = restriction.split(delimiter)
    return int(range_vals[0]) <= age <= int(range_vals[1])


def solve_gender(restriction, params):
    if restriction is None:
        return True

    gender = params["gender"]

    if gender == "U":
        return True

    if len(restriction) > 0 and gender[0] != restriction:
        return False
    return True


def solve_country_whitelist(restriction, params):
    if restriction is None:
        return True

    country = params["country"]

    if len(restriction) > 0 and country not in restriction:
        return False
    return True


def solve_country_blacklist(restriction, params):
    if restriction is None:
        return True

    country = params["country"]

    if len(restriction) > 0 and country in restriction:
        return False
    return True
