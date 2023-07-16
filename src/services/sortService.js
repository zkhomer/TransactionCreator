const sortService = {
    sortByField: (array, field, order = 'asc') => {
        const sortedArray = [...array];

        sortedArray.sort((a, b) => {
            const aValue = a[field];
            const bValue = b[field];

            if (field === 'date') {
                const dateA = new Date(aValue);
                const dateB = new Date(bValue);

                if (dateA < dateB) {
                    return order === 'asc' ? -1 : 1;
                }
                if (dateA > dateB) {
                    return order === 'asc' ? 1 : -1;
                }
                return 0;
            }

            if (aValue < bValue) {
                return order === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return sortedArray;
    },
};

export default sortService;
