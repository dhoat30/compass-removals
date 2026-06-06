export function quoteCalculation(data) {
    let price = 0;

    // For website type
    switch (data.what_type_of_website_do_you_need_) {
        case 'smallBusinessWebsite':
            price += 1400;
            break;
        case 'e-commerce':
            price += 1470;
            break;
        case 'educationalWebsite':
            price += 2490;
            break;
        case 'portfolio':
            price += 1400;
            break;
        case 'corporatePortal':
            price += 4560;
            break;
    }

    // For website goal
    switch (data.what_specific_goals_do_you_hope_to_achieve_with_this_site_) {
        case 'increaseSales':
            price += 990;
            break;
        case 'generateLeads':
            price += 250;
            break;
        case 'shareInformation':
            price += 100;
            break;
    }

    // For UI design availability
    switch (data.do_you_already_have_a_ui_design_prepared_) {
        case 'yes':
            price += 0;
            break;
        case 'no':
            price += 1600;
            break;
    }

    // For launch timeline
    switch (data.by_when_are_you_hoping_to_launch_the_website_) {
        case 'twoWeeks':
            price += 600;
            break;
        case 'fourWeeks':
            price += 200;
            break;
        case 'sixWeeks':
            price += 0;
            break;
    }

    return price;
}