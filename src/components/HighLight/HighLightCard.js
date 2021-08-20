import { CardContent, Typography, Card, makeStyles } from '@material-ui/core'
import React from 'react'
import CountUp from 'react-countup'


const useStyle = makeStyles({
    wrapper: (props) => {
        if (props.type === 'confirmed') return { borderLeft: '5px solid #c9302c' }
        if (props.type === 'recovered') return { borderLeft: '5px solid #28a745' }
        else return { borderLeft: '5px solid gray' }
    },
    title: {
        fontSize: 18, marginBottom: 5,
    },
    count: {
        fontSize: 18, fontWeight: 'bold',
    }
})

export default function HighLight({ title, count, type }) {
    const styles = useStyle({ type });

    return (
        <Card className={styles.wrapper}>
            <CardContent>
                <Typography component="p" variant="body2" className={styles.title}>{title}</Typography>

                <Typography component="p" variant="body2" className={styles.count}>
                    <CountUp end={count || 0} duration={2} separator={' '} />
                </Typography>
            </CardContent>
        </Card>
    )

}