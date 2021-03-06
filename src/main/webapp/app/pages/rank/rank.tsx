import './rank.css';

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getSession } from 'app/shared/reducers/authentication';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RankerList from './components/ranker-list';

let id = 0;

function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const styles = theme =>
    createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing.unit * 2,
            textAlign: 'center',
            color: theme.palette.text.secondary
        }
    });

interface ISearchRange {
    startDate: string,
    endDate: string
}

const mainLeftContent = classes => {

    function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    function dateFormat(date) {
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate());
    }

    const title = '이번 달 랭킹',
        now = new Date(),
        startDate = new Date(now.getFullYear(), now.getMonth(), 1),
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const range: ISearchRange = { startDate: dateFormat(startDate), endDate: dateFormat(endDate) };
    console.dir(range);
    return (
        <RankerList title={ title } range={ range }/>
    );
};

const mainRightContent = classes => {
    const title = '전체 랭킹';

    return (
        <RankerList title={ title } />
    );
};

const gridContainer = (classes, leftXs, rightXs) => (
    <Grid container spacing={ 24 }>
        <Grid item xs={ leftXs }>
            { mainLeftContent(classes) }
        </Grid>
        <Grid item xs={ rightXs }>
            { mainRightContent(classes) }
        </Grid>
    </Grid>
);

export interface IRankProp extends StateProps, DispatchProps {
    classes: any;
}

export class RankPage extends React.Component<IRankProp> {
    componentDidMount() {
        this.props.getSession();
    }

    render() {
        const { account, classes } = this.props;
        return (
            <div>
                { gridContainer(classes, 6, 6) }
            </div>
        );
    }
}

const mapStateToProps = storeState => ({
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(RankPage));
