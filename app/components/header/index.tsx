import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { CustomHeaderProps } from "../../types";
import { ArrowLeft, ChevronRight, MapPin, Share2 } from "lucide-react-native";

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  onBack,
  onShare,
  locationSubtitle,
  locationSubtitleHandler
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerMain}>

        <View style={styles.titleContainer}>
          {onBack ?
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <ArrowLeft size={24} color="#f34b83" />
            </TouchableOpacity>
            : null}
          {title ?
            <Text style={styles.title}>{title}</Text>
            : null}
        </View>

        {onShare ?
          <TouchableOpacity onPress={onShare}>
            <Share2 size={24} color="#f34b83" />
          </TouchableOpacity>
          : null}

      </View>
      {locationSubtitle ?
        <TouchableOpacity style={styles.locationConatiner} onPress={() => locationSubtitleHandler()}>
          <Text style={styles.locationIcon}>
            <MapPin size={12} color="#330411" />
          </Text>
          <Text style={styles.locationTitle}>{locationSubtitle}</Text>
          <Text style={styles.locationRightIcon}>
            <ChevronRight size={10} color="#330411" />
          </Text>
        </TouchableOpacity>
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    paddingVertical: 10
  },
  locationIcon: {
    marginRight: 8
  },
  locationRightIcon: {
    marginLeft: 8
  },
  backButton: {
    marginRight: 10
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    backgroundColor: '#fff',
  },
  headerMain: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#330411',
    fontFamily: 'Poppins-SemiBold',
  },
  locationConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingTop: 4,
    backgroundColor: '#fff',
    paddingBottom: 12
  },
  locationTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#330411',
    fontFamily: 'Poppins-Regular',
  },
});