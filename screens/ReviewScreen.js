import React, { Component } from 'react';
import { Linking, Platform, ScrollView, Text, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';

class ReviewScreen extends Component {
    static navigationOptions = props => {
        const { navigation } = props;
        const { navigate } = navigation;
        return {
            headerTitle: 'Review Jobs',
            headerRight: 
                (<Button title='Settings'
                onPress = { () => navigate('settings') }
                backgroundColor = 'rgba(0,0,0,0)'
                color = 'rgba(0, 122, 125, 1)' 
                /> 
                ),
                style: {
                    marginTop: Platform.OS === 'android' ? 24 : 0    
                }
        };
    }

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const { company, formattedRelativeTime, latitude, longitude, url } = job;
            const initialRegion = {
                longitude,
                latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            };

            return (
                <Card>
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
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = {
    italics: {
        fontStyle: 'italic'
    },
    detailWrapper: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
}

function mapStateToProps(state) {
    return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);