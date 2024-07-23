import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { themes } from '../../constants/themes'
import { hp, wp } from '../../helpers/common'
import Categories from '../../components/categories'
import { apiCall } from '../../api'
import ImageGrid from '../../components/ImageGrid'
import { debounce } from 'lodash'
import Filter from '../../components/Filter'


const HomeScreen = () => {

    const [activeCategory, setActiveCategory] = useState(null)
    const [images, setImages] = useState([])

    const searchInputRef = useRef(null)

    const { top } = useSafeAreaInsets()

    const [search, setSearch] = useState('')

    const [allFilters, setAllFilters] = useState(null)

    const clearText = () => {
        setSearch('')
        searchInputRef?.current?.clear()
    }

    const handleChangeCategory = (cat) => {
        setActiveCategory(cat)
        clearText()
        setImages([])
        page = 1
        let params = {
            page,
            ...allFilters
        }
        if (cat) params.category = cat
        fetchImages(params, false)

    }

    // Apply and reset filters
    const applyFilters = () => {
        if (applyFilters) {
            page = 1;
            setImages([])
            let params = {
                page, ...allFilters
            }
            if (activeCategory) params.category = activeCategory
            if (search) params.q = search
            fetchImages(params, false)
        }
        closeModal()
    }

    const resetFilters = () => {
        if (allFilters) {
            page = 1
            setAllFilters(null)
            setImages([])
            let params = {
                page
            }
            if (activeCategory) params.category = activeCategory
            if (search) params.q = search
            fetchImages(params, false)
        }

        closeModal()
    }

    const modalRef = useRef(null)


    // Search using the text input
    const handleSearch = text => {
        setSearch(text)
        if (text.length > 2) {
            page = 1
            setImages([])
            setActiveCategory(null) //reset category while searching
            fetchImages({ page, q: text, ...allFilters }, false)
        }
        if (text === '') {
            page = 1
            searchInputRef?.current?.clear()
            setActiveCategory(null) //reset  category while searching
            setImages([])
            fetchImages({ page, ...allFilters }, false)
        }
    }

    // Add debounce functionality
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

    // dynamically determine the top of a screen
    const paddingTop = top > 8 ? top + 10 : 30


    // Function to open and close the modal

    const openModal = () => {
        modalRef?.current?.present()
    }

    const closeModal = () => {
        modalRef?.current.close()
    }

    // Fetch images
    useEffect(() => {
        fetchImages()
    }, [])

    const fetchImages = async (params = { page: 1 }, append = false) => {
        let res = await apiCall(params)
        if (res.success && res?.data?.hits) {
            if (append) {
                setImages([images, ...res.data.hits])
            }
            else {
                setImages([...res.data.hits])
            }


        }
    }

    // Clear filters
    const clearThisFilter = (filterName) => {
        let filters = { ...allFilters };
        delete filters[filterName]
        setAllFilters({ ...filters })
        page = 1
        setImages([])
        let params = {
            ...filters
        }
        if (activeCategory) params.category = activeCategory
        if (search) params.q = search
        fetchImages(params, false)

    }


    return (
        <View style={[styles.container, { paddingTop }]} >
            {/**Heeader */}
            <View style={styles.header} >
                <Pressable>
                    <Text style={styles.title} >Pixels</Text>
                </Pressable>
                <Pressable onPress={openModal} >
                    <FontAwesome6 name='bars-staggered' color={themes.colors.neutral(0.7)} size={22} />
                </Pressable>
            </View>
            <ScrollView contentContainerStyle={{ gap: 15 }} >
                {/**Search bar */}
                <View style={styles.searchBar} >
                    <View style={styles.searchIcon} >
                        <Feather name='search' size={24} color={themes.colors.neutral(0.4)} />
                    </View>
                    <TextInput ref={searchInputRef} onChangeText={handleTextDebounce} placeholder='Search for Photos' style={styles.searchInput} />
                    {search && <Pressable onPress={() => handleSearch('')} style={styles.closeIcon} >
                        <Ionicons name='close' size={24} color={themes.colors.neutral(0.6)} />
                    </Pressable>}
                </View>
                {/**Categories */}
                <View style={styles.categories} >
                    <Categories handleChangeCategory={handleChangeCategory} activeCategory={activeCategory} />
                </View>

                {/**Filters */}

                {
                    allFilters && (
                        <View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters} >
                                {
                                    Object.keys(allFilters).map((key) => {
                                        return (
                                            <View key={key} style={styles.filterItem} >
                                                {
                                                    key === 'colors' ?
                                                        <View style={{ height: 20, width: 30, borderRadius: 7, backgroundColor: allFilters[key] }} >

                                                        </View> :
                                                        <Text style={styles.filterItemText} >{allFilters[key]}</Text>
                                                }

                                                <Pressable style={styles.filterCloseIcon} onPress={() => clearThisFilter(key)} >
                                                    <Ionicons name='close' size={14} color={themes.colors.neutral(0.9)} />
                                                </Pressable>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    )
                }

                {/**Image grid */}
                <View>
                    {
                        images.length > 0 && <ImageGrid images={images} />
                    }
                </View>
                {/**Loading state */}
                <View style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }} >
                    <ActivityIndicator size='large' color={'red'} />
                </View>

            </ScrollView>
            {/**Filter component */}
            <Filter
                allFilters={allFilters}
                setAllFilters={setAllFilters}
                modalRef={modalRef}
                onClose={closeModal}
                onReset={resetFilters}
                onApply={applyFilters}
            />

        </View>
    )
}

export default HomeScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15,

    },
    header: {
        marginHorizontal: wp(4),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: hp(3),
        fontWeight: themes.fontWeight.medium,
        color: themes.colors.neutral(0.9)
    },
    searchBar: {
        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: themes.colors.grayBg,
        backgroundColor: themes.colors.white,
        padding: 6,
        paddingLeft: 10,
        borderRadius: themes.radius.lg

    },
    searchIcon: {
        padding: 0,
        marginRight: 3
    },
    searchInput: {
        flex: 1,
        borderRadius: themes.radius.sm,
        paddingVertical: 10,
        fontSize: hp(1.8)
    },
    closeIcon: {
        backgroundColor: themes.colors.neutral(0.1),
        padding: 4,
        borderRadius: themes.radius.sm
    },
    filters: {
        paddingHorizontal: wp(4),
        gap: 10
    },
    filterItem: {
        flexDirection: 'row',
        backgroundColor: themes.colors.grayBg,
        padding: 3,
        borderRadius: themes.radius.xs,
        gap: 10,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    filterItemText: {
        fontSize: hp(1.8)
    },
    filterCloseIcon: {
        backgroundColor: themes.colors.neutral(0.2),
        padding: 4,
        borderRadius: 7
    }


})