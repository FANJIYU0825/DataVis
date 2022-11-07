def value_trans(data, tranfun, RGB_setting):
    new_x = []
    for x in range(0, 124):
        new_y = []
        for y in range(0, 124):
            new_z = []
            for z in range(0, 49):
                cell_value = getValue(x, y, z)
                new_z.append(opacity_mapping(
                    cell_value, opacityTransferFunc, 0))
            new_y.append(new_z)
        new_x.append(new_y)
    return new_x
