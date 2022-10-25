import Inputmask from "../bundle";
import jQuery from "jquery";

if (Inputmask.dependencyLib === jQuery)
    window.jQuery = Inputmask.dependencyLib;

import qunit from "qunit";
import "./prototypeExtensions.js";
import simulator from "./simulator.js";


// android testing
Inputmask.extendDefaults({
    inputEventOnly: false
});

window.Inputmask = Inputmask; //inject globally for the simulator to detect inputeventonly

import tests_alternations from "./tests_alternations";
import tests_attributes from "./tests_attributes";
import tests_base from "./tests_base";
import tests_date from "./tests_date";
import tests_dynamic from "./tests_dynamic";
import tests_escape from "./tests_escape";
import tests_formatvalidate from "./tests_formatvalidate";
import tests_initialvalue from "./tests_initialvalue";
import tests_inputeventonly from "./tests_inputeventonly";
import tests_ip from "./tests_ip";
import tests_jitmasking from "./tests_jitmasking";
import tests_jquery_inputmask from "./tests_jquery_inputmask";
import tests_keepStatic from "./tests_keepStatic";
import tests_multi from "./tests_multi";
import tests_numeric from "./tests_numeric";
import tests_numericinput from "./tests_numericinput";
import tests_option from "./tests_option";
import tests_optional from "./tests_optional";
import tests_paste from "./tests_paste";
import tests_regex from "./tests_regex";
import tests_setvalue from "./tests_setvalue";

//inject simulater code in the dependencies
simulator(Inputmask.dependencyLib, Inputmask);
simulator(jQuery, Inputmask);

//load tests
if (qunit) {
    tests_alternations(qunit, Inputmask);
    tests_attributes(qunit, Inputmask);
    tests_base(qunit, Inputmask);
    tests_date(qunit, Inputmask);
    tests_dynamic(qunit, Inputmask);
    tests_escape(qunit, Inputmask);
    tests_formatvalidate(qunit, Inputmask);
    tests_initialvalue(qunit, Inputmask);
    tests_inputeventonly(qunit, Inputmask);
    tests_ip(qunit, Inputmask);
    tests_jitmasking(qunit, Inputmask);
    tests_jquery_inputmask(qunit, jQuery, Inputmask);
    tests_keepStatic(qunit, Inputmask);
    tests_multi(qunit, Inputmask);
    tests_numeric(qunit, Inputmask);
    tests_numericinput(qunit, Inputmask);
    tests_option(qunit, Inputmask);
    tests_optional(qunit, Inputmask);
    tests_paste(qunit, Inputmask);
    tests_regex(qunit, Inputmask);
    tests_setvalue(qunit, Inputmask);

    qunit.load();
  <!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="/css/main.min.css?v=1.92" />
<link rel="stylesheet" type="text/css" href="/ui/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/ui/css/bootstrap-theme.min.css?v=1.1" />
<link rel="stylesheet" type="text/css" href="/ui/css/nstyle.min.css?v=1.2" />
<link rel="stylesheet" type="text/css" href="/plugins/password-indicator/css/password-indicator.css" />
<script type="text/javascript" src="/js/jquery.min.js?v=1"></script>
<script type="text/javascript" src="/js/bootstrap.min.js?v=1"></script>
<script type="text/javascript" src="/js/bootstrap-noconflict.js?v=1.1"></script>
<script type="text/javascript" src="/js/jquery-ui-no-conflict.min.js?v=1.1"></script>
<script type="text/javascript" src="/js/main.min.js?v=2.3.1"></script>
<script type="text/javascript" src="/plugins/password-indicator/js/password-indicator.js"></script>
<script type="text/javascript" src="/js/jquery.ba-bbq.min.js?v=1"></script>
<script type="text/javascript">
/*<![CDATA[*/
var ghsdfkjlkhhealk35bbr = "M2lyfnB-aFBkcnZKV1VIMXhhSk9RNjZ2OEZmU1JfSmNavI6i78M5PzKpbk7sMlZ83ndwhkSN__t33GBilo43cA=="; 
/*]]>*/
</script>
<title>Shop - Orders</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
</head>
<body>
<div class='imageline'><span>We</span> work <span>for your</span> profit</div>

            <header class="header">
        <!--[if !IE]>
<style>
    .form-control {
        background-image: none;
    }

    .col-md-5 {
        width: 41.66666667%;
    }
</style>
<![endif]-->
<!--[if !IE 8]>
<style>
    .form-control {
        background-image: none;
    }

    .col-md-5 {
        width: 41.66666667%;
    }
</style>
<![endif]-->
<!--[if !IE 9]>
<style>
    .form-control {
        background-image: none;
    }

    .col-md-5 {
        width: 41.66666667%;
    }
</style>
<![endif]-->
<div class='topline'>
    <div class='main_width'>
        <div class='logo'><a href='/'></a></div>
        <ul class='topmenu'>
            <li class='news'><a href='/'>NEW<span>S</span><i></i></a>
            </li>
            <li class='buy pmenu'><a>BU<span>Y</span><i></i></a>
                <ul>
                    <li><a href='/products/index/'>products</a></li>
                    <li><a href='/ssnsearch/index/'>ssn search</a></li>
                    <li><a href='/preorder/index/'>preorder</a></li>
                </ul>
            </li>
            <li class='orders'>
                <a href='/orders/index/'>ORDER<span>S</span><i></i></a></li>
            <li class='billing pmenu'><a>BILLIN<span>G</span><i></i></a>
                <ul>
                                            <li><a href='/billing/index/'>top up</a></li>
                                        <li><a href='/billing/history/'>history</a></li>
                </ul>
            </li>
            <li class='binbase'>
                <a href='/binbase/'>BINBAS<span>E</span><i></i></a></li>
                        <li class='support pmenu'><a>SUPPOR<span>T</span><i></i></a>
                <ul>
                    <li><a href='/tickets/index/'>tickets</a></li>
                    <li><a href='/profile/edit/'>change password</a></li>
                    <li><a href='/page/faq/'>Faq</a></li><li><a href='/page/terms/'>Terms</a></li>                                    </ul>
            </li>
        </ul>
        <div class='bc_info'>
            <div class='balance'>
                <a href="/billing/index/"><span>balance</span><b id="balance_block">3.92                        $</b></a></div>
            <div class='card'>
                <a href="/cart/index/"><span>cart</span><b id="items_block">0</b></a>
            </div>
        </div>
        <div class='logout'><a href='/logout/'></a></div>
    </div>
    <div class="clearfix"></div>

    
            <div class="notifierBar" style="display:none;" style="margin-top:-10px;">
            ALL YOUR CARDS ARE CHECKED
        </div>

    
        <div class="ssnNotifierBar" style="display:none;" >
            ALL YOUR SSN SEARCHES ARE FINISHED
        </div>

        </div>    </header>

<div class='content'>
        <div class='fix_width'>
                
                <form class="form" id="orders-form" action="/orders/download/" method="post">
<input type="hidden" value="M2lyfnB-aFBkcnZKV1VIMXhhSk9RNjZ2OEZmU1JfSmNavI6i78M5PzKpbk7sMlZ83ndwhkSN__t33GBilo43cA==" name="ghsdfkjlkhhealk35bbr" /><div style="font-size:12px;" id="orders-grid" class="grid-view">
<div class="summary">Displaying 1-25 of 47 results.</div>
<table class="items table table-striped table-condensed table-bordered">
<thead>
<tr>
<th class="checkbox-column" id="OrderID"><input type="checkbox" value="1" name="OrderID_all" id="OrderID_all" /></th><th id="orders-grid_c1">ID</th><th id="orders-grid_c2">Payed At</th><th id="orders-grid_c3">Items</th><th id="orders-grid_c4">Sum</th><th id="orders-grid_c5">&nbsp;</th></tr>
</thead>
<tbody>
<tr class="odd">
<td class="checkbox-column"><input value="49194188" id="OrderID_0" type="checkbox" name="OrderID[]" /></td><td>49194188</td><td>2020-07-12 03:03:35</td><td>Items: 1</td><td>10.30$</td><td><a href="/orders/show/49194188/">Browse</a></td></tr>
<tr class="even">
<td class="checkbox-column"><input value="49071114" id="OrderID_1" type="checkbox" name="OrderID[]" /></td><td>49071114</td><td>2020-07-09 12:59:45</td><td>Items: 1</td><td>10.00$</td><td><a href="/orders/show/49071114/">Browse</a></td></tr>
<tr class="odd">
<td class="checkbox-column"><input value="48852524" id="OrderID_2" type="checkbox" name="OrderID[]" /></td><td>48852524</td><td>2020-07-04 22:19:08</td><td>Items: 1</td><td>10.30$</td><td><a href="/orders/show/48852524/">Browse</a></td></tr>
<tr class="even">
<td class="checkbox-column"><input value="48852323" id="OrderID_3" type="checkbox" name="OrderID[]" /></td><td>48852323</td><td>2020-07-04 22:10:05</td><td>Items: 1</td><td>10.30$</td><td><a href="/orders/show/48852323/">Browse</a></td></tr>
<tr class="odd">
<td class="checkbox-column"><input value="48792408" id="OrderID_4" type="checkbox" name="OrderID[]" /></td><td>48792408</td><td>2020-07-03 13:42:41</td><td>Items: 1</td><td>10.30$</td><td><a href="/orders/show/48792408/">Browse</a></td></tr>
<tr class="even">
<td class="checkbox-column"><input value="48358040" id="OrderID_5" type="checkbox" name="OrderID[]" /></td><td>48358040</td><td>2020-06-23 21:58:19</td><td>Items: 1</td><td>10.30$</td><td><a href="/orders/show/48358040/">Browse</a></td></tr>
<tr class="odd">
<td class="checkbox-column"><input value="48353705" id="OrderID_6" type="checkbox" name="OrderID[]" /></td><td>48353705</td><td>2020-06-23 20:00:00</td><td>Items: 2</td><td>20.60$</td><td><a href="/orders/show/48353705/">Browse</a></td></tr>
<tr class="even">
<td class="checkbox-column"><input value="48306588" id="OrderID_7" type="checkbox" name="OrderID[]" /></td><td>48306588</td><td>2020-06-22 20:21:04</td><td>Items: 1</td><td>15.00$</td><td><a href="/orders/show/48306588/">Browse</a></td></tr>
<tr class="odd">
<td class="checkbox-column"><input value="47966425" id="OrderID_8" type="checkbox" name="OrderID[]" /></td><td>47966425</td><td>2020-06-15 10:25:19</td><td>Items: 1</td><td>10.00$</td><td><a href="/orders/show/47966425/">Browse</a></td></tr>
<tr class="even">
<td class="checkbox-column"><input value="47920085" id="OrderID_9" type="checkbox" name="OrderID[]" /></td><td>47920085</td><td>2020-06-14 01:16:40</td><td>Items: 1</td><td>16.00$</td><td><a href="/orders/show/47920085/">Browse</a></td></tr>
<tr class="odd">
<td class="checkbox-column"><input value="47918805" id="OrderID_10" type="checkbox" name="OrderID[]" /></td><td>47918805</td><td>2020-06-14 00:23:32</td><td>Items: 1</td><td>16.00$</td><td><a href="/orders/show/47918805/">Browse</a></td></tr>
<tr class="even">
<td class="checkbox-column"><input value="47918322" id="OrderID_11" type="checkbox" name="OrderID[]" /></td><td>47918322</td><td>2020-06-14 00:02:54</td><td>Items: 1</td><td>16.00$</td><td><a href="/orders/show/47918322/">Browse</a></td></tr>
<tr class="odd">
<td class="checkbox-column"><input value="47851451" id="OrderID_12" type="checkbox" name="OrderID[]" /></td><td>47851451</td><td>2020-06-12 13:27:48</td><td>Items: 1</td><td>10.00$</td><td><a href="/orders/show/47851451/">Browse</a></td></tr>
<tr class="even">
<td class="checkbox-column"><input value="47624100" id="OrderID_13" type="checkbox" name="OrderID[]" /></td><td>47624100</td><td>2020-06-07 12:49:22</td><td>Items: 2</td><td>20.60$</td><td><a href="/orders/show/47624100/">Browse</a></td></tr>
<tr class="odd">
<td class="checkbox-column"><input value="47310084" id="OrderID_14" type="checkbox" name="OrderID[]" /></td><td>47310084</td><td>2020-05-31 00:52:53</td><td>Items: 1</td><td>10.00$</td><td><a href="/orders/show/47310084/">Browse</a></td></tr>
<tr class="even">
<td class="checkbox-column"><input value="44003365" id="OrderID_15" type="checkbox" name="OrderID[]" /></td><td>44003365</td><td>2020-05-19 09:11:44</td><td>Items: 1</td><td>10.00$</td><td><a href="/orders/show/44003365/">Browse</a></td></tr>
<tr class="odd">
<td class="checkbox-column"><input value="43954704" id="OrderID_16" type="checkbox" name="OrderID[]" /></td><td>43954704</td><td>2020-05-18 13:42:48</td><td>Items: 1</td><td>10.00$</td><td><a href="/orders/show/43954704/">Browse</a></td></tr>
<tr class="even">
<td class="checkbox-column"><input value="43871934" id="OrderID_17" type="checkbox" name="OrderID[]" /></td><td>43871934</td><td>2020-05-16 23:28:49</td><td>Items: 1</td><td>10.00$</td><td><a href="/orders/show/43871934/">Browse</a></td></tr>
<tr class="odd">
<td class="checkbox-column"><input value="43838383" id="OrderID_18" type="checkbox" name="OrderID[]" /></td><td>43838383</td><td>2020-05-16 02:04:15</td><td>Items: 1</td><td>5.30$</td><td><a href="/orders/show/43838383/">Browse</a></td></tr>
<tr class="even">
<td class="checkbox-column"><input value="43836164" id="OrderID_19" type="checkbox" name="OrderID[]" /></td><td>43836164</td><td>2020-05-16 01:04:18</td><td>Items: 1</td><td>5.30$</td><td><a href="/orders/show/43836164/">Browse</a></td></tr>
<tr class="odd">
<td class="checkbox-column"><input value="43661502" id="OrderID_20" type="checkbox" name="OrderID[]" /></td><td>43661502</td><td>2020-05-12 22:47:46</td><td>Items: 1</td><td>10.30$</td><td><a href="/orders/show/43661502/">Browse</a></td></tr>
<tr class="even">
<td class="checkbox-column"><input value="43659252" id="OrderID_21" type="checkbox" name="OrderID[]" /></td><td>43659252</td><td>2020-05-12 21:51:09</td><td>Items: 1</td><td>10.30$</td><td><a href="/orders/show/43659252/">Browse</a></td></tr>
<tr class="odd">
<td class="checkbox-column"><input value="43655536" id="OrderID_22" type="checkbox" name="OrderID[]" /></td><td>43655536</td><td>2020-05-12 20:12:35</td><td>Items: 2</td><td>20.60$</td><td><a href="/orders/show/43655536/">Browse</a></td></tr>
<tr class="even">
<td class="checkbox-column"><input value="43256090" id="OrderID_23" type="checkbox" name="OrderID[]" /></td><td>43256090</td><td>2020-05-05 14:45:19</td><td>Items: 1</td><td>10.00$</td><td><a href="/orders/show/43256090/">Browse</a></td></tr>
<tr class="odd">
<td class="checkbox-column"><input value="43253687" id="OrderID_24" type="checkbox" name="OrderID[]" /></td><td>43253687</td><td>2020-05-05 13:51:17</td><td>Items: 1</td><td>10.00$</td><td><a href="/orders/show/43253687/">Browse</a></td></tr>
</tbody>
</table>
<div class="no-class"><div><ul class="pagination pull-right" id="yw0"><li class="first disabled"><a href="/orders/index/">&laquo;</a></li>
<li class="previous disabled"><a href="/orders/index/">&lsaquo;</a></li>
<li class=" active"><a href="/orders/index/">1</a></li>
<li class=""><a href="/orders/index/Operations_page/2/">2</a></li>
<li class="next"><a href="/orders/index/Operations_page/2/">&rsaquo;</a></li>
<li class="last"><a href="/orders/index/Operations_page/2/">&raquo;</a></li></ul><div style="clear: both;"></div></div></div><div class="keys" style="display:none" title="/orders/index/"><span>49194188</span><span>49071114</span><span>48852524</span><span>48852323</span><span>48792408</span><span>48358040</span><span>48353705</span><span>48306588</span><span>47966425</span><span>47920085</span><span>47918805</span><span>47918322</span><span>47851451</span><span>47624100</span><span>47310084</span><span>44003365</span><span>43954704</span><span>43871934</span><span>43838383</span><span>43836164</span><span>43661502</span><span>43659252</span><span>43655536</span><span>43256090</span><span>43253687</span></div>
</div><br/>
<div class="inline">
    <div class="pull-left">
        <button name="Delete" id="order_delete" class="btn btn-danger" type="button">Delete</button>    </div>
    <div class="pull-right">
        <div class="pull-left">
            <div class="form-group"><div><select class="form-control" placeholder="Download Format" name="Operations[download_format]" id="Operations_download_format">
<option value="1">CCNUM|EXP|CVV|NAME|ADDRESS|CITY|STATE|ZIP|COUNTRY|PHONE|EMAIL|DOB|SSN|MMN|DL|VBV|SORT|OTHER</option>
</select></div></div>        </div>
        &nbsp;<button name="Download" id="download" class="btn btn-primary" type="submit">Download</button>    </div>
</div>
<br/>
</form><br/>

                    </div>
</div>
<div class='footer'>
    <a href='/tickets/index/' class='support'><span>S</span>UPPORT</a>
    <a href='/page/faq/' class='faq'><span>F</span>AQ</a>
    <a href='/page/terms/' class='terms'><span>T</span>ERMS OF USE</a>
</div>
<script type="text/javascript" src="/js/jquery.yiigridview.js"></script>
<script type="text/javascript">
/*<![CDATA[*/
jQuery(function($) {
jQuery('[data-toggle=popover]').popover();
jQuery('[data-toggle=tooltip]').tooltip();
jQuery(document).on('click','#OrderID_all',function() {
	var checked=this.checked;
	jQuery("input[name='OrderID\[\]']:enabled").each(function() {this.checked=checked;});
});
jQuery(document).on('click', "input[name='OrderID\[\]']", function() {
	jQuery('#OrderID_all').prop('checked', jQuery("input[name='OrderID\[\]']").length==jQuery("input[name='OrderID\[\]']:checked").length);
});
jQuery('#orders-grid').yiiGridView({'ajaxUpdate':['orders\x2Dgrid'],'ajaxVar':'ajax','pagerClass':'no\x2Dclass','loadingClass':'grid\x2Dview\x2Dloading','filterClass':'filters','tableClass':'items\x20table\x20table\x2Dstriped\x20table\x2Dcondensed\x20table\x2Dbordered','selectableRows':1,'enableHistory':false,'updateSelector':'\x7Bpage\x7D,\x20\x7Bsort\x7D','filterSelector':'\x7Bfilter\x7D','pageVar':'Operations_page','afterAjaxUpdate':function() {
			jQuery('.popover').remove();
			jQuery('[data-toggle=popover]').popover();
			jQuery('.tooltip').remove();
			jQuery('[data-toggle=tooltip]').tooltip();
		}});
});
/*]]>*/
</script>
</body>
</html>
  // qunit.start();
}
