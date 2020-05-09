<?php
function create_posttype()
{
    register_post_type(
        'devices',
        array(
            'labels' => array(
                'name' => __('Devices'),
                'singular_name' => __('Devices')
            ),
            'public' => true,
            'has_archive' => false,
            'rewrite' => array('slug' => 'devices'),
        )
    );
    register_post_type(
        'tools',
        array(
            'labels' => array(
                'name' => __('Tools'),
                'singular_name' => __('Tools')
            ),
            'public' => true,
            'has_archive' => false,
            'rewrite' => array('slug' => 'tools'),
        )
    );
    register_post_type(
        'cases',
        array(
            'labels' => array(
                'name' => __('Cases'),
                'singular_name' => __('Cases')
            ),
            'public' => true,
            'has_archive' => false,
            'rewrite' => array('slug' => 'cases'),
        )
    );
    register_post_type(
        'patterns',
        array(
            'labels' => array(
                'name' => __('Patterns'),
                'singular_name' => __('Patterns')
            ),
            'public' => true,
            'has_archive' => false,
            'rewrite' => array('slug' => 'patterns'),
        )
    );
}

// Hooking up our function to theme setup
add_action('init', 'create_posttype');