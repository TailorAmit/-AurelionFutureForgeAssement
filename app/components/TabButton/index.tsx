import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Plus, X } from 'lucide-react-native';
interface TabButtonProps {
    label: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    activeIndex?: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({ label, onPress, style, textStyle, activeIndex }) => {
    return (
        <TouchableOpacity style={[styles.button, activeIndex && styles.acctive, style]} onPress={onPress} activeOpacity={0.7} >
            <Text style={[styles.text, textStyle]}>{label}</Text>
            {activeIndex ?
                <X size={22} color="#330411" style={styles.icon} />
                :
                <Plus size={22} color="#330411" style={styles.icon} />}
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f4b8c4',
        marginRight: 8,
        backgroundColor: '#fff',
        height: 36,
        justifyContent: 'center',
    },
    acctive: {
        backgroundColor: "#FFBDCF"
    },
    text: {
        color: '#330411',
        fontSize: 16,
        marginRight: 4,
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
    },
    icon: {
        // marginTop: 1,
    },
});

export default TabButton;
