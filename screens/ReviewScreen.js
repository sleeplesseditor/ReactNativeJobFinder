import React, { Component } from 'react';
import { Linking, Platform, ScrollView, Text, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import { clearLikedJobs } from '../actions';
import { connect } from 'react-redux';

class ReviewScreen extends Component {

    static navigationOptions = {
        title: 'Review Jobs',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="favorite" size={30} color={tintColor} />;
        }
    }

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const { company, formattedRelativeTime, jobkey, jobtitle, latitude, longitude, url } = job;
            const initialRegion = {
                longitude,
                latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            };

            return (
                <Card title={jobtitle} key={jobkey}>
                    <View style={{ height: 200 }}>
                        <MapView 
                            style={{ flex: 1}}
                            cacheEnabled={Platform.OS === 'android'}
                            scrollEnabled={false}
                            initialRegion={initialRegion}
                        />
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime}</Text>
                        </View>
                        <Button 
                            title="Apply Now"
                            backgroundColor="#03A9F4"
                            onPress={() => Linking.openURL(url)}
                        />
                    </View>
                </Card>
            );
        });
    }
    
    render() {
        return (
            <ScrollView style={{ marginTop: 20 }}>
                {this.renderLikedJobs()}
                <Button 
                    title="Reset Liked Jobs"
                    large
                    icon={{ name: 'delete-forever' }}
                    backgroundColor="#F44336"
                    onPress={this.props.clearLikedJobs}
                    style={{ marginTop: 25 }}
                />
            </ScrollView>
        );
    }
}


const styles = {
    italics: {
        fontStyle: 'italic'
    },
    detailWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
}

function mapStateToProps(state) {
    return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps, { clearLikedJobs })(ReviewScreen);