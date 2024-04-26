months_a = set(["Jan", "Feb", "March", "Apr", "May", "June"])
months_b = set(["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"])

subset_check = months_a <= months_b
superset_check = months_b <= months_a

print(subset_check)
print(superset_check)
